import { v4 as uuidv4 } from 'uuid';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Car from '../../infra/typeorm/entities/Car';

class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  public async create({
    name,
    brand,
    model,
    daily_rent_value,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id: uuidv4(),
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  public async findByName(name: string): Promise<Car | undefined> {
    const car = this.cars.find(currentCar => currentCar.name === name);

    return car;
  }
}

export default FakeCarsRepository;
