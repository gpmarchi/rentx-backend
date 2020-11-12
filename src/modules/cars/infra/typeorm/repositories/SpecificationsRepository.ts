import { Repository, getRepository, In } from 'typeorm';

import ICreateSpecificationDTO from '@modules/cars/dtos/ICreateSpecificationDTO';
import IFindSpecificationDTO from '@modules/cars/dtos/IFindSpecificationDTO';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import Specification from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private ormRepository: Repository<Specification>;

  constructor() {
    this.ormRepository = getRepository(Specification);
  }

  public async create(
    specificationData: ICreateSpecificationDTO,
  ): Promise<Specification> {
    const specification = this.ormRepository.create(specificationData);

    await this.ormRepository.save(specification);

    return specification;
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.ormRepository.findOne({ where: { name } });

    return specification;
  }

  public async findAllById(
    specifications: IFindSpecificationDTO[],
  ): Promise<Specification[]> {
    const specificationIds = specifications.map(
      specification => specification.id,
    );

    const foundSpecifications = await this.ormRepository.find({
      where: { id: In(specificationIds) },
    });

    return foundSpecifications;
  }
}

export default SpecificationsRepository;
