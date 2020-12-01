import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import File from '@modules/files/infra/typeorm/entities/File';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';
import ICarImagesDTO from '../dtos/ICarImagesDTO';

@injectable()
class CreateCarImagesService {
  private carsRepository: ICarsRepository;

  private filesRepository: IFilesRepository;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
    @inject('FilesRepository')
    filesRepository: IFilesRepository,
    @inject('StorageProvider')
    storageProvider: IStorageProvider,
  ) {
    this.carsRepository = carsRepository;
    this.filesRepository = filesRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ car_id, images }: ICarImagesDTO): Promise<File[]> {
    // verificar se o carro informado como parâmetro existe
    const car = await this.carsRepository.findById(car_id);

    // se não existir, retornar erro
    if (!car) {
      throw new AppError('Car does not exists');
    }

    // se existir, verificar se já possui 4 imagens associadas
    // se já possuir 4 imagens associadas apagar os arquivos da pasta temporária
    // e retornar erro
    const maxImagesPerCar = Number(process.env.MAX_IMAGES_PER_CAR);

    const { images: existingImages } = car;

    if (existingImages && existingImages.length === maxImagesPerCar) {
      const deleteTmpImagesPromises = images.map(async image =>
        this.storageProvider.deleteTmpFile(image.filename),
      );

      await Promise.all(deleteTmpImagesPromises);

      throw new AppError(
        `Car already have ${maxImagesPerCar} associated images.`,
      );
    }

    // se não possuir 4 imagens mas possuir algumas imagens já salvas retornar erro
    // informando o limite ainda disponível para upload e apagar os arquivos da
    // pasta temporária
    if (
      existingImages &&
      existingImages.length >= 1 &&
      existingImages.length < maxImagesPerCar
    ) {
      images.forEach(image =>
        this.storageProvider.deleteTmpFile(image.filename),
      );

      const availableImageAssociations =
        maxImagesPerCar - existingImages.length;

      throw new AppError(
        `Car can only have ${availableImageAssociations} more associated image(s).`,
      );
    }

    // para cada arquivo a ser salvo
    // inserir os dados do arquivo na tabela Files
    // mover o arquivo salvo para a pasta correta dentro do servidor
    const promises = images.map(async image => {
      const file = await this.filesRepository.create({
        original_name: image.originalname,
        filename: image.filename,
        car_id,
      });

      await this.storageProvider.saveFile(image.filename);

      return file;
    });

    const files = await Promise.all(promises);

    return files;
  }
}

export default CreateCarImagesService;
