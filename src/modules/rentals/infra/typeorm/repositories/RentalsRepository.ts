import { Repository, getRepository } from 'typeorm';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IFindCarRentalInDateRangeDTO from '@modules/rentals/dtos/IFindCarRentalInDateRangeDTO';
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
    const rentals = this.ormRepository
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
}

export default RentalsRepository;
