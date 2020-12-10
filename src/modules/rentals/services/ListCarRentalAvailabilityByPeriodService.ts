import { injectable, inject } from 'tsyringe';
import { isBefore, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import IFindRentalByDateRangeDTO from '../dtos/IFindRentalByDateRangeDTO';
import IRentalsRepository from '../repositories/IRentalsRepository';

@injectable()
class ListCarRentalAvailabilityByPeriodService {
  private rentalsRepository: IRentalsRepository;

  private carsRepository: ICarsRepository;

  constructor(
    @inject('RentalsRepository')
    rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
  }

  public async execute({
    start_date,
    end_date,
  }: IFindRentalByDateRangeDTO): Promise<Car[]> {
    if (
      isBefore(start_date, new Date()) ||
      isBefore(end_date, new Date()) ||
      isAfter(start_date, end_date)
    ) {
      throw new AppError('Selected rental period is invalid.');
    }

    const rentals = await this.rentalsRepository.findByDateRange({
      start_date,
      end_date,
    });

    const rentedCarIds = rentals.map(rental => rental.car_id);

    const availableCars = this.carsRepository.findNotListed(rentedCarIds);

    return availableCars;
  }
}

export default ListCarRentalAvailabilityByPeriodService;
