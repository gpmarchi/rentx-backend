import { v4 as uuidv4 } from 'uuid';

import ICreateSpecificationDTO from '@modules/cars/dtos/ICreateSpecificationDTO';
import IFindSpecificationDTO from '@modules/cars/dtos/IFindSpecificationDTO';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import Specification from '../../infra/typeorm/entities/Specification';

class FakeSpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  public async create(
    specificationData: ICreateSpecificationDTO,
  ): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { id: uuidv4() }, specificationData);

    this.specifications.push(specification);

    return specification;
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      currentSpecification => currentSpecification.name === name,
    );

    return specification;
  }

  public async findAllById(
    specifications: IFindSpecificationDTO[],
  ): Promise<Specification[]> {
    const foundSpecifications: Specification[] = [];

    specifications.forEach(searchedSpecification => {
      const specification = this.specifications.find(
        currentSpecification =>
          currentSpecification.id === searchedSpecification.id,
      );

      if (specification) {
        foundSpecifications.push(specification);
      }
    });

    return foundSpecifications;
  }
}

export default FakeSpecificationsRepository;
