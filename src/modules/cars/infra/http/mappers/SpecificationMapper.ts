import { classToClass } from 'class-transformer';

import ICarSpecificationResponseDTO from '@modules/cars/dtos/ICarSpecificationResponseDTO';
import CarSpecification from '../../typeorm/entities/CarSpecification';

export default class SpecificationMapper {
  public static toDTO(
    carSpecification: CarSpecification,
  ): ICarSpecificationResponseDTO {
    const { id, value, specification } = carSpecification;

    const { unit, icon } = specification;

    const iconWithImageURL = classToClass(icon);

    return {
      id,
      value: `${value} ${unit}`,
      icon_url: iconWithImageURL.getFileUrl(),
    };
  }
}
