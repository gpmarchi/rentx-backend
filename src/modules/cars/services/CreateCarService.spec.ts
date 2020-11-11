import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';

let fakeCarsRepository: FakeCarsRepository;
let createCar: CreateCarService;

describe('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    createCar = new CreateCarService(fakeCarsRepository);
  });

  it('should be able to create new car', async () => {
    const car = await createCar.execute({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create car with already existing name', async () => {
    await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
    });

    await expect(
      createCar.execute({
        name: 'Aventador S',
        brand: 'Lamborghini',
        model: 'Aventador',
        daily_rent_value: 500,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
