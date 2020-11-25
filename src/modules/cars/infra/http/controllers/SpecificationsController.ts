import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSpecificationService from '@modules/cars/services/CreateSpecificationService';

export default class SpecifiationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, unit, icon_id } = request.body;

    const createSpecification = container.resolve(CreateSpecificationService);

    const car = await createSpecification.execute({
      name,
      description,
      unit,
      icon_id,
    });

    return response.json(car);
  }
}
