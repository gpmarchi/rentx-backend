import { v4 as uuidv4 } from 'uuid';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import IFindAllCarsDTO from '@modules/cars/dtos/IFindAllCarsDTO';
import IPaginatedCarResponseDTO from '@modules/cars/dtos/IPaginatedCarResponseDTO';
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
    fuel_id,
    transmission_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id: uuidv4(),
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
      fuel_id,
      transmission_id,
    });

    this.cars.push(car);

    return car;
  }

  public async findByName(name: string): Promise<Car | undefined> {
    const car = this.cars.find(currentCar => currentCar.name === name);

    return car;
  }

  public async findAll(_: IFindAllCarsDTO): Promise<IPaginatedCarResponseDTO> {
    return { totalRecords: this.cars.length, totalPages: 1, data: this.cars };
  }
}

export default FakeCarsRepository;
