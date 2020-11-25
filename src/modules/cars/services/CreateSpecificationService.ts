import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import Specification from '../infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';
import ICreateSpecificationDTO from '../dtos/ICreateSpecificationDTO';

@injectable()
class CreateSpecificationService {
  private specificationsRepository: ISpecificationsRepository;

  private filesRepository: IFilesRepository;

  constructor(
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
    @inject('FilesRepository')
    filesRepository: IFilesRepository,
  ) {
    this.specificationsRepository = specificationsRepository;
    this.filesRepository = filesRepository;
  }

  public async execute({
    name,
    description,
    unit,
    icon_id,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const registeredSpecification = await this.specificationsRepository.findByName(
      name,
    );

    if (registeredSpecification) {
      throw new AppError('Specification already registered.');
    }

    const icon = await this.filesRepository.findById(icon_id);

    if (!icon) {
      throw new AppError('Icon file not found.');
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
      unit,
      icon_id,
    });

    return specification;
  }
}

export default CreateSpecificationService;
