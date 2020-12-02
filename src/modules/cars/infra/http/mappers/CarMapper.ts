import { classToClass } from 'class-transformer';

import ICarResponseDTO from '@modules/cars/dtos/ICarResponseDTO';
import Car from '../../typeorm/entities/Car';
import FuelMapper from './FuelMapper';
import TransmissionMapper from './TransmissionMapper';
import SpecificationMapper from './SpecificationMapper';

export default class CarMapper {
  public static toDTO(car: Car): ICarResponseDTO {
    const { fuel, transmission, specifications, images, ...rest } = car;

    let transformedFuel;

    if (fuel) {
      transformedFuel = FuelMapper.toDTO(fuel);
    }

    let transformedSpecifications;

    if (specifications) {
      transformedSpecifications = specifications.map(specification =>
        SpecificationMapper.toDTO(specification),
      );

      if (transformedFuel) {
        transformedSpecifications.push(transformedFuel);
      }

      let transformedTransmission;

      if (transmission) {
        transformedTransmission = TransmissionMapper.toDTO(transmission);
        transformedSpecifications.push(transformedTransmission);
      }
    }

    const transformedImages = images.map(image => {
      const imageWithURL = classToClass(image);
      return imageWithURL.getFileUrl();
    });

    return {
      ...rest,
      fuel: transformedFuel,
      specifications: transformedSpecifications,
      images: transformedImages,
    };
  }
}
