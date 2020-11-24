import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import Fuel from '../infra/typeorm/entities/Fuel';
import ICreateFuelDTO from '../dtos/ICreateFuelDTO';
import IFuelsRepository from '../repositories/IFuelsRepository';

@injectable()
class CreateFuelService {
  private fuelsRepository: IFuelsRepository;

  private filesRepository: IFilesRepository;

  constructor(
    @inject('FuelsRepository')
    fuelsRepository: IFuelsRepository,
    @inject('FilesRepository')
    filesRepository: IFilesRepository,
  ) {
    this.fuelsRepository = fuelsRepository;
    this.filesRepository = filesRepository;
  }

  public async execute({ name, icon_id }: ICreateFuelDTO): Promise<Fuel> {
    const registeredFuel = await this.fuelsRepository.findByName(name);

    if (registeredFuel) {
      throw new AppError('Fuel already registered.');
    }

    const icon = await this.filesRepository.findById(icon_id);

    if (!icon) {
      throw new AppError('Icon file not found.');
    }

    const fuel = await this.fuelsRepository.create({
      name,
      icon_id,
    });

    return fuel;
  }
}

export default CreateFuelService;
