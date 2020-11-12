import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarService from '@modules/cars/services/CreateCarService';

export default class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
    } = request.body;

    const createCar = container.resolve(CreateCarService);

    const car = await createCar.execute({
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
    });

    return response.json(car);
  }
}
