import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Car from '../infra/typeorm/entities/Car';
import ICreateCarDTO from '../dtos/ICreateCarDTO';
import ICarsRepository from '../repositories/ICarsRepository';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';
import IFuelsRepository from '../repositories/IFuelsRepository';
import ITransmissionsRepository from '../repositories/ITransmissionsRepository';

@injectable()
class CreateCarService {
  private carsRepository: ICarsRepository;

  private specificationsRepository: ISpecificationsRepository;

  private fuelsRepository: IFuelsRepository;

  private transmissionsRepository: ITransmissionsRepository;

  constructor(
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
    @inject('FuelsRepository')
    fuelsRepository: IFuelsRepository,
    @inject('TransmissionsRepository')
    transmissionsRepository: ITransmissionsRepository,
  ) {
    this.carsRepository = carsRepository;
    this.specificationsRepository = specificationsRepository;
    this.fuelsRepository = fuelsRepository;
    this.transmissionsRepository = transmissionsRepository;
  }

  public async execute({
    name,
    brand,
    model,
    daily_rent_value,
    specifications,
    fuel_id,
    transmission_id,
  }: ICreateCarDTO): Promise<Car> {
    const registeredCar = await this.carsRepository.findByName(name);

    if (registeredCar) {
      throw new AppError('Car already registered.');
    }

    if (specifications) {
      const specificationIds = specifications.map(specification => {
        return { id: specification.specification_id };
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
    }

    const registeredFuel = await this.fuelsRepository.findById(fuel_id);

    if (!registeredFuel) {
      throw new AppError('Invalid type of fuel.');
    }

    const registeredTransmission = await this.transmissionsRepository.findById(
      transmission_id,
    );

    if (!registeredTransmission) {
      throw new AppError('Invalid type of transmission.');
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
      fuel_id,
      transmission_id,
    });

    return car;
  }
}

export default CreateCarService;
