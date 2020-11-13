import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Transmission from '../infra/typeorm/entities/Transmission';
import ICreateTransmissionDTO from '../dtos/ICreateTransmissionDTO';
import ITransmissionsRepository from '../repositories/ITransmissionsRepository';

@injectable()
class CreateTransmissionService {
  private transmissionsRepository: ITransmissionsRepository;

  constructor(
    @inject('TransmissionsRepository')
    transmissionsRepository: ITransmissionsRepository,
  ) {
    this.transmissionsRepository = transmissionsRepository;
  }

  public async execute({
    name,
  }: ICreateTransmissionDTO): Promise<Transmission> {
    const registeredTransmission = await this.transmissionsRepository.findByName(
      name,
    );

    if (registeredTransmission) {
      throw new AppError('Transmission already registered.');
    }

    const transmission = await this.transmissionsRepository.create({
      name,
    });

    return transmission;
  }
}

export default CreateTransmissionService;
