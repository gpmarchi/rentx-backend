import { Repository, getRepository } from 'typeorm';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IFindCarRentalInDateRangeDTO from '@modules/rentals/dtos/IFindCarRentalInDateRangeDTO';
import IFindRentalByDateRangeDTO from '@modules/rentals/dtos/IFindRentalByDateRangeDTO';
import IMostRentedCarResponseDTO from '@modules/rentals/dtos/IMostRentedCarResponseDTO';
import Rental from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  public async create({
    car_id,
    user_id,
    start_date,
    end_date,
    daily_rent_value,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      start_date,
      end_date,
      daily_rent_value,
      total,
    });

    await this.ormRepository.save(rental);

    return rental;
  }

  public async findByCarIdAndDateRange({
    car_id,
    start_date,
    end_date,
  }: IFindCarRentalInDateRangeDTO): Promise<Rental[]> {
    const rentals = await this.ormRepository
      .createQueryBuilder()
      .where('car_id = :id', { id: car_id })
      .andWhere('start_date BETWEEN :start AND :end', {
        start: start_date,
        end: end_date,
      })
      .orWhere('end_date BETWEEN :start AND :end', {
        start: start_date,
        end: end_date,
      })
      .orWhere(':start BETWEEN start_date AND end_date', {
        start: start_date,
      })
      .orWhere(':end BETWEEN start_date AND end_date', {
        end: end_date,
      })
      .getMany();

    return rentals;
  }

  public async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.ormRepository
      .createQueryBuilder('rental')
      .where('user_id = :id', { id: user_id })
      .andWhere('start_date >= :current_date', { current_date: new Date() })
      .orWhere('end_date >= :current_date', { current_date: new Date() })
      .leftJoinAndSelect('rental.car', 'car')
      .leftJoinAndSelect('car.images', 'images')
      .leftJoinAndSelect('car.fuel', 'fuel')
      .leftJoinAndSelect('fuel.icon', 'icon')
      .getMany();

    return rentals;
  }

  public async findByDateRange({
    start_date,
    end_date,
  }: IFindRentalByDateRangeDTO): Promise<Rental[]> {
    const rentals = await this.ormRepository
      .createQueryBuilder()
      .where('start_date BETWEEN :start AND :end', {
        start: start_date,
        end: end_date,
      })
      .orWhere('end_date BETWEEN :start AND :end', {
        start: start_date,
        end: end_date,
      })
      .orWhere(':start BETWEEN start_date AND end_date', {
        start: start_date,
      })
      .orWhere(':end BETWEEN start_date AND end_date', {
        end: end_date,
      })
      .getMany();

    return rentals;
  }

  public async countAllFromUser(user_id: string): Promise<number> {
    const totalUserRentals = await this.ormRepository.count({ user_id });

    return totalUserRentals;
  }

  public async findUserMostRentedCar(
    user_id: string,
  ): Promise<IMostRentedCarResponseDTO> {
    const rentedCars = await this.ormRepository
      .createQueryBuilder('rentals')
      .select('rentals.car_id, COUNT(rentals.car_id) as total')
      .where('rentals.user_id = :id', { id: user_id })
      .groupBy('rentals.car_id')
      .orderBy('total', 'DESC')
      .getRawMany();

    if (rentedCars.length === 0) {
      return { totalFavoriteRentals: 0, car_id: undefined };
    }

    const { car_id, total } = rentedCars[0];

    return { totalFavoriteRentals: total, car_id };
  }
}

export default RentalsRepository;
