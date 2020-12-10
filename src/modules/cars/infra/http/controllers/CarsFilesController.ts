import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarImagesService from '@modules/cars/services/CreateCarImagesService';

export default class CarsFilesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCarImages = container.resolve(CreateCarImagesService);

    const carImages = await createCarImages.execute({
      car_id: request.body.car_id,
      images: request.files as Express.Multer.File[],
    });

    return response.json(carImages);
  }
}
