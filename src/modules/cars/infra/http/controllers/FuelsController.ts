import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFuelService from '@modules/cars/services/CreateFuelService';

export default class FuelsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createFuel = container.resolve(CreateFuelService);

    const fuel = await createFuel.execute({
      name,
    });

    return response.json(fuel);
  }
}
