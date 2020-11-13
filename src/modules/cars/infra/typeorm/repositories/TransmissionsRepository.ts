import { Repository, getRepository } from 'typeorm';

import ICreateTransmissionDTO from '@modules/cars/dtos/ICreateTransmissionDTO';
import ITransmissionsRepository from '@modules/cars/repositories/ITransmissionsRepository';
import Transmission from '../entities/Transmission';

class TransmissionsRepository implements ITransmissionsRepository {
  private ormRepository: Repository<Transmission>;

  constructor() {
    this.ormRepository = getRepository(Transmission);
  }

  public async create({ name }: ICreateTransmissionDTO): Promise<Transmission> {
    const transmission = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(transmission);

    return transmission;
  }

  public async findByName(name: string): Promise<Transmission | undefined> {
    const transmission = await this.ormRepository.findOne({ where: { name } });

    return transmission;
  }

  public async findById(id: string): Promise<Transmission | undefined> {
    const transmission = await this.ormRepository.findOne(id);

    return transmission;
  }
}

export default TransmissionsRepository;
