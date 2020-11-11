import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Specification from '../infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../repositories/ISpecificationsRepository';

interface IRequestDTO {
  name: string;
  description: string;
  unit: string;
}

@injectable()
class CreateSpecificationService {
  private specificationsRepository: ISpecificationsRepository;

  constructor(
    @inject('SpecificationsRepository')
    specificationsRepository: ISpecificationsRepository,
  ) {
    this.specificationsRepository = specificationsRepository;
  }

  public async execute({
    name,
    description,
    unit,
  }: IRequestDTO): Promise<Specification> {
    const registeredSpecification = await this.specificationsRepository.findByName(
      name,
    );

    if (registeredSpecification) {
      throw new AppError('Specification already registered.');
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
      unit,
    });

    return specification;
  }
}

export default CreateSpecificationService;
