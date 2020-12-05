import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRentalService from '@modules/rentals/services/CreateRentalService';

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
}
