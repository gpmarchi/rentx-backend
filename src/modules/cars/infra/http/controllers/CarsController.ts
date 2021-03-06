import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarService from '@modules/cars/services/CreateCarService';
import ListCarsService from '@modules/cars/services/ListCarsService';
import ShowCarService from '@modules/cars/services/ShowCarService';

import CarMapper from '../mappers/CarMapper';

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

    const { data, ...totals } = await listCars.execute({
      page: Number(page),
      limit: Number(limit),
      name: name ? String(name) : name,
    });

    const transformedCars = data.map(car => CarMapper.toDTO(car));

    return response.json({ ...totals, data: transformedCars });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCar = container.resolve(ShowCarService);

    const car = await showCar.execute({ car_id: id });

    return response.json(CarMapper.toDTO(car));
  }
}
