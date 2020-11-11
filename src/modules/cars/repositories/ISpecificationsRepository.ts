import ICreateSpecificationDTO from '@modules/cars/dtos/ICreateSpecificationDTO';
import Specification from '../infra/typeorm/entities/Specification';

export default interface ISpecificationsRepository {
  create(specificationData: ICreateSpecificationDTO): Promise<Specification>;

  findByName(name: string): Promise<Specification | undefined>;
}
