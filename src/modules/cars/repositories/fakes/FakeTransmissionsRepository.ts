import { v4 as uuidv4 } from 'uuid';

import ICreateTransmissionDTO from '@modules/cars/dtos/ICreateTransmissionDTO';
import ITransmissionsRepository from '@modules/cars/repositories/ITransmissionsRepository';
import Transmission from '../../infra/typeorm/entities/Transmission';

class FakeTransmissionsRepository implements ITransmissionsRepository {
  private transmissions: Transmission[] = [];

  public async create({
    name,
    icon_id,
  }: ICreateTransmissionDTO): Promise<Transmission> {
    const transmission = new Transmission();

    Object.assign(transmission, {
      id: uuidv4(),
      name,
      icon_id,
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

  public async findById(id: string): Promise<Transmission | undefined> {
    const transmission = this.transmissions.find(
      currentTransmission => currentTransmission.id === id,
    );

    return transmission;
  }
}

export default FakeTransmissionsRepository;
