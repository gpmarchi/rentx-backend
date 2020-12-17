import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IFindCarRentalInDateRangeDTO from '../dtos/IFindCarRentalInDateRangeDTO';
import IFindRentalByDateRangeDTO from '../dtos/IFindRentalByDateRangeDTO';
import IMostRentedCarResponseDTO from '../dtos/IMostRentedCarResponseDTO';
import Rental from '../infra/typeorm/entities/Rental';

export default interface IRentalsRepository {
  create({
    car_id,
    user_id,
    start_date,
    end_date,
    daily_rent_value,
    total,
  }: ICreateRentalDTO): Promise<Rental>;

  findByCarIdAndDateRange({
    car_id,
    start_date,
    end_date,
  }: IFindCarRentalInDateRangeDTO): Promise<Rental[]>;

  findByUserId(user_id: string): Promise<Rental[]>;

  findByDateRange({
    start_date,
    end_date,
  }: IFindRentalByDateRangeDTO): Promise<Rental[]>;

  countAllFromUser(user_id: string): Promise<number>;

  findUserMostRentedCar(user_id: string): Promise<IMostRentedCarResponseDTO>;
}
