import AppError from '@shared/errors/AppError';

import FakeFilesRepository from '@modules/files/repositories/fakes/FakeFilesRepository';
import FakeSpecificationsRepository from '../repositories/fakes/FakeSpecificationsRepository';
import CreateSpecificationService from './CreateSpecificationService';

let fakeSpecificationsRepository: FakeSpecificationsRepository;
let fakeFilesRepository: FakeFilesRepository;
let createSpecification: CreateSpecificationService;

describe('CreateSpecification', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    fakeFilesRepository = new FakeFilesRepository();

    createSpecification = new CreateSpecificationService(
      fakeSpecificationsRepository,
      fakeFilesRepository,
    );
  });

  it('should be able to create new specification', async () => {
    const icon = await fakeFilesRepository.create({
      original_name: 'icon original name',
      filename: 'icon filename',
    });

    const specification = await createSpecification.execute({
      name: 'Maximum speed',
      description: 'Maximum speed the car reaches',
      unit: 'km/h',
      icon_id: icon.id,
    });

    expect(specification).toHaveProperty('id');
  });

  it('should not be able to create specification with already existing name', async () => {
    const icon = await fakeFilesRepository.create({
      original_name: 'icon original name',
      filename: 'icon filename',
    });

    await fakeSpecificationsRepository.create({
      name: 'Maximum speed',
      description: 'Maximum speed the car reaches',
      unit: 'km/h',
      icon_id: icon.id,
    });

    await expect(
      createSpecification.execute({
        name: 'Maximum speed',
        description: 'Maximum speed the car reaches',
        unit: 'km/h',
        icon_id: icon.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
