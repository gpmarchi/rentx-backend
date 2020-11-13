import { Repository, getRepository } from 'typeorm';

import ICreateFuelDTO from '@modules/cars/dtos/ICreateFuelDTO';
import IFuelsRepository from '@modules/cars/repositories/IFuelsRepository';
import Fuel from '../entities/Fuel';

class FuelsRepository implements IFuelsRepository {
  private ormRepository: Repository<Fuel>;

  constructor() {
    this.ormRepository = getRepository(Fuel);
  }

  public async create({ name }: ICreateFuelDTO): Promise<Fuel> {
    const fuel = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(fuel);

    return fuel;
  }

  public async findByName(name: string): Promise<Fuel | undefined> {
    const fuel = await this.ormRepository.findOne({ where: { name } });

    return fuel;
  }

  public async findById(id: string): Promise<Fuel | undefined> {
    const fuel = await this.ormRepository.findOne(id);

    return fuel;
  }
}

export default FuelsRepository;
