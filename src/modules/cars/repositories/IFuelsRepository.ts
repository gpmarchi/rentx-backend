import ICreateFuelDTO from '@modules/cars/dtos/ICreateFuelDTO';
import Fuel from '../infra/typeorm/entities/Fuel';

export default interface IFuelsRepository {
  create({ name, icon_id }: ICreateFuelDTO): Promise<Fuel>;

  findByName(name: string): Promise<Fuel | undefined>;

  findById(id: string): Promise<Fuel | undefined>;
}
