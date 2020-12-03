import { v4 as uuidv4 } from 'uuid';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import Rental from '../../infra/typeorm/entities/Rental';

class FakeRentalsRepository implements IRentalsRepository {
  private rentals: Rental[] = [];

  public async create({
    car_id,
    user_id,
    start_date,
    end_date,
    daily_rent_value,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id: uuidv4(),
      car_id,
      user_id,
      start_date,
      end_date,
      daily_rent_value,
      total,
    });

    this.rentals.push(rental);

    return rental;
  }
}

export default FakeRentalsRepository;
