import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IFindCarRentalInDateRangeDTO from '../dtos/IFindCarRentalInDateRangeDTO';
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
}
