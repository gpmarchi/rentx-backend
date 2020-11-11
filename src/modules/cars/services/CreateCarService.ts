import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequestDTO {
  name: string;
  brand: string;
  model: string;
  daily_rent_value: number;
}

@injectable()
class CreateCarService {
  private carsRepository: ICarsRepository;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
  ) {
    this.carsRepository = carsRepository;
  }

  public async execute({
    name,
    brand,
    model,
    daily_rent_value,
  }: IRequestDTO): Promise<Car> {
    const registeredCar = await this.carsRepository.findByName(name);

    if (registeredCar) {
      throw new AppError('Car already registered.');
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      model,
      daily_rent_value,
    });

    return car;
  }
}

export default CreateCarService;
