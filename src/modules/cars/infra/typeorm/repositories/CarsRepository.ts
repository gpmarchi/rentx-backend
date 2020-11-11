import { Repository, getRepository } from 'typeorm';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create(carData: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create(carData);

    await this.ormRepository.save(car);

    return car;
  }

  public async findByName(name: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne({ where: { name } });

    return car;
  }
}

export default CarsRepository;
