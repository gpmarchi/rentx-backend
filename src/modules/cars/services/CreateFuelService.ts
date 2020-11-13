import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Fuel from '../infra/typeorm/entities/Fuel';
import ICreateFuelDTO from '../dtos/ICreateFuelDTO';
import IFuelsRepository from '../repositories/IFuelsRepository';

@injectable()
class CreateFuelService {
  private fuelsRepository: IFuelsRepository;

  constructor(
    @inject('FuelsRepository')
    fuelsRepository: IFuelsRepository,
  ) {
    this.fuelsRepository = fuelsRepository;
  }

  public async execute({ name }: ICreateFuelDTO): Promise<Fuel> {
    const registeredFuel = await this.fuelsRepository.findByName(name);

    if (registeredFuel) {
      throw new AppError('Fuel already registered.');
    }

    const fuel = await this.fuelsRepository.create({
      name,
    });

    return fuel;
  }
}

export default CreateFuelService;
