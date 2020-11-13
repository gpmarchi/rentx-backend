import ICreateFuelDTO from '@modules/cars/dtos/ICreateFuelDTO';
import Fuel from '../infra/typeorm/entities/Fuel';

export default interface ICarsRepository {
  create({ name }: ICreateFuelDTO): Promise<Fuel>;

  findByName(name: string): Promise<Fuel | undefined>;
}
