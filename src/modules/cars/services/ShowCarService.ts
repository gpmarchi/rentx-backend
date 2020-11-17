import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShowCarDTO from '../dtos/IShowCarDTO';
import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

@injectable()
class ShowCarService {
  private carsRepository: ICarsRepository;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
  ) {
    this.carsRepository = carsRepository;
  }

  public async execute({ car_id }: IShowCarDTO): Promise<Car | undefined> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car not found.');
    }

    return car;
  }
}

export default ShowCarService;
