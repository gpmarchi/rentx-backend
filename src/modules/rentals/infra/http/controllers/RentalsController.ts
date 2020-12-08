import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRentalService from '@modules/rentals/services/CreateRentalService';
import ListRentalsService from '@modules/rentals/services/ListRentalsService';

import CarMapper from '@modules/cars/infra/http/mappers/CarMapper';

export default class RentalsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { car_id, start_date, end_date } = request.body;

    const { user } = request;

    const createRental = container.resolve(CreateRentalService);

    const rental = await createRental.execute({
      car_id,
      user_id: user.id,
      start_date,
      end_date,
    });

    return response.json(rental);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const listRentals = container.resolve(ListRentalsService);

    const rentals = await listRentals.execute(user.id);

    const transformedCarsInRentals = rentals.map(rental => {
      return { ...rental, car: CarMapper.toDTO(rental.car) };
    });

    return response.json(transformedCarsInRentals);
  }
}
