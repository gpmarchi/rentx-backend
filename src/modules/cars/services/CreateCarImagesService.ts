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
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exists');
    }

    const maxImagesPerCar = Number(process.env.MAX_IMAGES_PER_CAR);

    const carFiles = await this.filesRepository.findByCarId(car_id);

    if (carFiles.length === maxImagesPerCar) {
      const deleteTmpImagesPromises = images.map(async image =>
        this.storageProvider.deleteTmpFile(image.filename),
      );

      await Promise.all(deleteTmpImagesPromises);

      throw new AppError(
        `Car already have ${maxImagesPerCar} associated images.`,
      );
    }

    const availableImageAssociations = maxImagesPerCar - carFiles.length;

    if (images.length > availableImageAssociations) {
      const deleteTmpImagesPromises = images.map(image =>
        this.storageProvider.deleteTmpFile(image.filename),
      );

      await Promise.all(deleteTmpImagesPromises);

      throw new AppError(
        `Car can only have ${availableImageAssociations} more associated image(s).`,
      );
    }

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
