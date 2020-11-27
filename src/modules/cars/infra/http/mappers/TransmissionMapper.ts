import { classToClass } from 'class-transformer';

import ICarSpecificationResponseDTO from '@modules/cars/dtos/ICarSpecificationResponseDTO';
import Transmission from '../../typeorm/entities/Transmission';

export default class TransmissionMapper {
  public static toDTO(
    transmission: Transmission,
  ): ICarSpecificationResponseDTO {
    const { icon } = transmission;

    const iconWithImageURL = classToClass(icon);

    return {
      id: transmission.id,
      value: transmission.name,
      icon_url: iconWithImageURL.getFileUrl(),
    };
  }
}
