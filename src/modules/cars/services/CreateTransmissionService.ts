import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';  
import Transmission from '../infra/typeorm/entities/Transmission';
import ICreateTransmissionDTO from '../dtos/ICreateTransmissionDTO';
import ITransmissionsRepository from '../repositories/ITransmissionsRepository';

@injectable()
class CreateTransmissionService {
  private transmissionsRepository: ITransmissionsRepository;

  private filesRepository: IFilesRepository;

  constructor(
    @inject('TransmissionsRepository')
    transmissionsRepository: ITransmissionsRepository,
    @inject('FilesRepository')
    filesRepository: IFilesRepository,
  ) {
    this.transmissionsRepository = transmissionsRepository;
    this.filesRepository = filesRepository;
  }

  public async execute({
    name,
    icon_id,
  }: ICreateTransmissionDTO): Promise<Transmission> {
    const registeredTransmission = await this.transmissionsRepository.findByName(
      name,
    );

    if (registeredTransmission) {
      throw new AppError('Transmission already registered.');
    }

    const icon = await this.filesRepository.findById(icon_id);

    if (!icon) {
      throw new AppError('Icon file not found.');
    }

    const transmission = await this.transmissionsRepository.create({
      name,
      icon_id,
    });

    return transmission;
  }
}

export default CreateTransmissionService;
