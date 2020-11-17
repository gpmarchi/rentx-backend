import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarService from '@modules/cars/services/CreateCarService';
import ListCarsService from '@modules/cars/services/ListCarsService';

export default class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
      fuel_id,
      transmission_id,
    } = request.body;

    const createCar = container.resolve(CreateCarService);

    const car = await createCar.execute({
      name,
      brand,
      model,
      daily_rent_value,
      specifications,
      fuel_id,
      transmission_id,
    });

    return response.json(car);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page, limit, name } = request.query;

    const listCars = container.resolve(ListCarsService);

    const cars = await listCars.execute({
      page: Number(page),
      limit: Number(limit),
      name: name ? String(name) : name,
    });

    return response.json(cars);
  }
}
