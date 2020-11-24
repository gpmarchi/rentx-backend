import AppError from '@shared/errors/AppError';

import FakeFilesRepository from '@modules/files/repositories/fakes/FakeFilesRepository';
import FakeFuelsRepository from '../repositories/fakes/FakeFuelsRepository';
import CreateFuelService from './CreateFuelService';

let fakeFuelsRepository: FakeFuelsRepository;
let fakeFilesRepository: FakeFilesRepository;
let createFuel: CreateFuelService;

describe('CreateFuel', () => {
  beforeEach(() => {
    fakeFuelsRepository = new FakeFuelsRepository();
    fakeFilesRepository = new FakeFilesRepository();

    createFuel = new CreateFuelService(
      fakeFuelsRepository,
      fakeFilesRepository,
    );
  });

  it('should be able to create new fuel', async () => {
    const icon = await fakeFilesRepository.create({
      original_name: 'icon original name',
      filename: 'icon filename',
    });

    const fuel = await createFuel.execute({
      name: 'Gasoline',
      icon_id: icon.id,
    });

    expect(fuel).toHaveProperty('id');
  });

  it('should not be able to create fuel with already existing name', async () => {
    const icon = await fakeFilesRepository.create({
      original_name: 'icon orginal name',
      filename: 'icon filename',
    });

    await fakeFuelsRepository.create({
      name: 'Gasoline',
      icon_id: icon.id,
    });

    await expect(
      createFuel.execute({
        name: 'Gasoline',
        icon_id: icon.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create transmission with invalid icon', async () => {
    await expect(
      createFuel.execute({
        name: 'Gasoline',
        icon_id: 'some icon',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
