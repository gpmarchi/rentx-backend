import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
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
}
