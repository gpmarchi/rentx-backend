import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransmissionService from '@modules/cars/services/CreateTransmissionService';

export default class TransmissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, icon_id } = request.body;

    const createTransmission = container.resolve(CreateTransmissionService);

    const transmission = await createTransmission.execute({
      name,
      icon_id,
    });

    return response.json(transmission);
  }
}
