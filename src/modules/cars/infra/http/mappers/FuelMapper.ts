import { classToClass } from 'class-transformer';

import ICarSpecificationResponseDTO from '@modules/cars/dtos/ICarSpecificationResponseDTO';
import Fuel from '../../typeorm/entities/Fuel';

export default class FuelMapper {
  public static toDTO(fuel: Fuel): ICarSpecificationResponseDTO {
    const { icon } = fuel;

    const iconWithImageURL = classToClass(icon);

    return {
      id: fuel.id,
      value: fuel.name,
      icon_url: iconWithImageURL.getFileUrl(),
    };
  }
}
