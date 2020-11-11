import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

export default interface IUsersRepository {
  create(carData: ICreateCarDTO): Promise<Car>;

  findByName(name: string): Promise<Car | undefined>;
}
