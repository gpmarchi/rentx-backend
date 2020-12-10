import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import IFindAllCarsDTO from '@modules/cars/dtos/IFindAllCarsDTO';
import IPaginatedCarResponseDTO from '@modules/cars/dtos/IPaginatedCarResponseDTO';
import Car from '../infra/typeorm/entities/Car';

export default interface ICarsRepository {
  create({
    name,
    brand,
    model,
    daily_rent_value,
    specifications,
    fuel_id,
    transmission_id,
  }: ICreateCarDTO): Promise<Car>;

  findByName(name: string): Promise<Car | undefined>;

  findAll({
    page,
    limit,
    name,
  }: IFindAllCarsDTO): Promise<IPaginatedCarResponseDTO>;

  findById(id: string): Promise<Car | undefined>;

  findNotListed(ids: string[]): Promise<Car[]>;
}
