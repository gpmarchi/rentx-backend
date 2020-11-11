import AppError from '@shared/errors/AppError';

import FakeSpecificationsRepository from '../repositories/fakes/FakeSpecificationsRepository';
import CreateSpecificationService from './CreateSpecificationService';

let fakeSpecificationsRepository: FakeSpecificationsRepository;
let createSpecification: CreateSpecificationService;

describe('CreateSpecification', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();

    createSpecification = new CreateSpecificationService(
      fakeSpecificationsRepository,
    );
  });

  it('should be able to create new specification', async () => {
    const specification = await createSpecification.execute({
      name: 'Maximum speed',
      description: 'Maximum speed the car reaches',
      unit: 'km/h',
    });

    expect(specification).toHaveProperty('id');
  });

  it('should not be able to create specification with already existing name', async () => {
    await fakeSpecificationsRepository.create({
      name: 'Maximum speed',
      description: 'Maximum speed the car reaches',
      unit: 'km/h',
    });

    await expect(
      createSpecification.execute({
        name: 'Maximum speed',
        description: 'Maximum speed the car reaches',
        unit: 'km/h',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
