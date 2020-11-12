import { injectable, inject } from 'tsyringe';
import { validate as uuidValidate } from 'uuid';

import AppError from '@shared/errors/AppError';
import Car from '../infra/typeorm/entities/Car';
import ICreateCarDTO from '../dtos/ICreateCarDTO';
import ICarsRepository from '../repositories/ICarsRepository';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

@injectable()
class CreateCarService {
  private carsRepository: ICarsRepository;

  private specificationsRepository: ISpecificationsRepository;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
  ) {
    this.carsRepository = carsRepository;
    this.specificationsRepository = specificationsRepository;
  }

  public async execute({
    name,
    brand,
    model,
    daily_rent_value,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const registeredCar = await this.carsRepository.findByName(name);

    if (registeredCar) {
      throw new AppError('Car already registered.');
    }

    const specificationIds = specifications.map(specification => {
      const isValidUUID = uuidValidate(specification.id);

      if (!isValidUUID) {
        throw new AppError('You must provide valid specifications.');
      }

      return { id: specification.id };
    });

    const foundSpecifications = await this.specificationsRepository.findAllById(
      specificationIds,
    );

    if (
      foundSpecifications.length === 0 ||
      foundSpecifications.length < specificationIds.length
    ) {
      throw new AppError('You must provide valid specifications.');
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
    });

    return car;
  }
}

export default CreateCarService;
