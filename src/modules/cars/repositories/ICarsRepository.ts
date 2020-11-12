import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

export default interface ICarsRepository {
  create({
    name,
    brand,
    model,
    daily_rent_value,
    specifications,
  }: ICreateCarDTO): Promise<Car>;

  findByName(name: string): Promise<Car | undefined>;
}
