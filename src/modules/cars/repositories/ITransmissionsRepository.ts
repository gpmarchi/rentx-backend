import ICreateTransmissionDTO from '@modules/cars/dtos/ICreateTransmissionDTO';
import Transmission from '../infra/typeorm/entities/Transmission';

export default interface ITransmissionsRepository {
  create({ name, icon_id }: ICreateTransmissionDTO): Promise<Transmission>;

  findByName(name: string): Promise<Transmission | undefined>;

  findById(id: string): Promise<Transmission | undefined>;
}
