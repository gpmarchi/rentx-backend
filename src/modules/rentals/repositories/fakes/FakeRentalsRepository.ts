import { v4 as uuidv4 } from 'uuid';
import { isWithinInterval, isAfter, isEqual } from 'date-fns';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IFindCarRentalInDateRangeDTO from '@modules/rentals/dtos/IFindCarRentalInDateRangeDTO';
import IFindRentalByDateRangeDTO from '@modules/rentals/dtos/IFindRentalByDateRangeDTO';
import IMostRentedCarResponseDTO from '@modules/rentals/dtos/IMostRentedCarResponseDTO';
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

  public async findByCarIdAndDateRange({
    car_id,
    start_date,
    end_date,
  }: IFindCarRentalInDateRangeDTO): Promise<Rental[]> {
    const rentals = this.rentals.filter(
      rental =>
        (rental.car_id === car_id &&
          isWithinInterval(rental.start_date, {
            start: start_date,
            end: end_date,
          })) ||
        isWithinInterval(rental.end_date, {
          start: start_date,
          end: end_date,
        }) ||
        isWithinInterval(start_date, {
          start: rental.start_date,
          end: rental.end_date,
        }) ||
        isWithinInterval(end_date, {
          start: rental.start_date,
          end: rental.end_date,
        }),
    );

    return rentals;
  }

  public async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter(
      rental =>
        (rental.user_id === user_id &&
          isEqual(rental.start_date, new Date())) ||
        isEqual(rental.end_date, new Date()) ||
        isAfter(rental.start_date, new Date()) ||
        isAfter(rental.end_date, new Date()),
    );

    return rentals;
  }

  public async findByDateRange({
    start_date,
    end_date,
  }: IFindRentalByDateRangeDTO): Promise<Rental[]> {
    const rentals = this.rentals.filter(
      rental =>
        isWithinInterval(rental.start_date, {
          start: start_date,
          end: end_date,
        }) ||
        isWithinInterval(rental.end_date, {
          start: start_date,
          end: end_date,
        }) ||
        isWithinInterval(start_date, {
          start: rental.start_date,
          end: rental.end_date,
        }) ||
        isWithinInterval(end_date, {
          start: rental.start_date,
          end: rental.end_date,
        }),
    );

    return rentals;
  }

  public async countAllFromUser(user_id: string): Promise<number> {
    const totalUserRentals = this.rentals.reduce((accumulator, rental) => {
      if (rental.user_id === user_id) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);

    return totalUserRentals;
  }

  public async findUserMostRentedCar(
    user_id: string,
  ): Promise<IMostRentedCarResponseDTO> {
    return { totalFavoriteRentals: 1, car_id: uuidv4() };
  }
}

export default FakeRentalsRepository;
