import { injectable, inject } from 'tsyringe';
import { isBefore, isAfter, differenceInDays } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Rental from '../infra/typeorm/entities/Rental';
import ICreateRentalDTO from '../dtos/ICreateRentalDTO';
import IRentalsRepository from '../repositories/IRentalsRepository';

@injectable()
class CreateRentalService {
  private rentalsRepository: IRentalsRepository;

  private carsRepository: ICarsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    @inject('RentalsRepository')
    rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({
    car_id,
    user_id,
    start_date,
    end_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Selected car does not exist.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Invalid user.');
    }

    if (
      isBefore(start_date, new Date()) ||
      isBefore(end_date, new Date()) ||
      isAfter(start_date, end_date)
    ) {
      throw new AppError('Selected rental period is invalid.');
    }

    const rentals = await this.rentalsRepository.findByCarIdAndDateRange({
      car_id,
      start_date,
      end_date,
    });

    if (rentals.length > 0) {
      throw new AppError('The car is already rented for the selected period.');
    }

    const { daily_rent_value } = car;
    const amountOfRentalDays = differenceInDays(end_date, start_date);
    const total = daily_rent_value * amountOfRentalDays;

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      start_date,
      end_date,
      daily_rent_value,
      total,
    });

    return rental;
  }
}

export default CreateRentalService;
