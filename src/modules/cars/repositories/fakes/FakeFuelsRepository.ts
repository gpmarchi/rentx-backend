import { v4 as uuidv4 } from 'uuid';

import ICreateFuelDTO from '@modules/cars/dtos/ICreateFuelDTO';
import IFuelsRepository from '@modules/cars/repositories/IFuelsRepository';
import Fuel from '../../infra/typeorm/entities/Fuel';

class FakeFuelsRepository implements IFuelsRepository {
  private fuels: Fuel[] = [];

  public async create({ name }: ICreateFuelDTO): Promise<Fuel> {
    const fuel = new Fuel();

    Object.assign(fuel, {
      id: uuidv4(),
      name,
    });

    this.fuels.push(fuel);

    return fuel;
  }

  public async findByName(name: string): Promise<Fuel | undefined> {
    const fuel = this.fuels.find(currentFuel => currentFuel.name === name);

    return fuel;
  }
}

export default FakeFuelsRepository;
