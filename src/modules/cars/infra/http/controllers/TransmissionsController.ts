import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransmissionService from '@modules/cars/services/CreateTransmissionService';

export default class TransmissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createTransmission = container.resolve(CreateTransmissionService);

    const transmission = await createTransmission.execute({
      name,
    });

    return response.json(transmission);
  }
}
