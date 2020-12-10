import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCarRentalAvailabilityByPeriodService from '@modules/rentals/services/ListCarRentalAvailabilityByPeriodService';
import CarMapper from '@modules/cars/infra/http/mappers/CarMapper';

export default class CarRentalAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date } = request.query;

    const listCarRentalAvailability = container.resolve(
      ListCarRentalAvailabilityByPeriodService,
    );

    const cars = await listCarRentalAvailability.execute({
      start_date: start_date ? new Date(String(start_date)) : new Date(),
      end_date: end_date ? new Date(String(end_date)) : new Date(),
    });

    const transformedCars = cars.map(car => {
      return CarMapper.toDTO(car);
    });

    return response.json(transformedCars);
  }
}
