import { v4 as uuidv4 } from 'uuid';

import ICreateTransmissionDTO from '@modules/cars/dtos/ICreateTransmissionDTO';
import ITransmissionsRepository from '@modules/cars/repositories/ITransmissionsRepository';
import Transmission from '../../infra/typeorm/entities/Transmission';

class FakeTransmissionsRepository implements ITransmissionsRepository {
  private transmissions: Transmission[] = [];

  public async create({ name }: ICreateTransmissionDTO): Promise<Transmission> {
    const transmission = new Transmission();

    Object.assign(transmission, {
      id: uuidv4(),
      name,
    });

    this.transmissions.push(transmission);

    return transmission;
  }

  public async findByName(name: string): Promise<Transmission | undefined> {
    const transmission = this.transmissions.find(
      currentTransmission => currentTransmission.name === name,
    );

    return transmission;
  }
}

export default FakeTransmissionsRepository;
