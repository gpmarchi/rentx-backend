import AppError from '@shared/errors/AppError';

import FakeFuelsRepository from '../repositories/fakes/FakeFuelsRepository';
import CreateFuelService from './CreateFuelService';

let fakeFuelsRepository: FakeFuelsRepository;
let createFuel: CreateFuelService;

describe('CreateFuel', () => {
  beforeEach(() => {
    fakeFuelsRepository = new FakeFuelsRepository();

    createFuel = new CreateFuelService(fakeFuelsRepository);
  });

  it('should be able to create new fuel', async () => {
    const fuel = await createFuel.execute({
      name: 'Gasoline',
    });

    expect(fuel).toHaveProperty('id');
  });

  it('should not be able to create fuel with already existing name', async () => {
    await fakeFuelsRepository.create({
      name: 'Gasoline',
    });

    await expect(
      createFuel.execute({
        name: 'Gasoline',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
