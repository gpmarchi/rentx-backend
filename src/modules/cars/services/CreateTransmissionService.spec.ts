import AppError from '@shared/errors/AppError';

import FakeTransmissionsRepository from '../repositories/fakes/FakeTransmissionsRepository';
import CreateTransmissionService from './CreateTransmissionService';

let fakeTransmissionsRepository: FakeTransmissionsRepository;
let createTransmisssion: CreateTransmissionService;

describe('CreateTransmission', () => {
  beforeEach(() => {
    fakeTransmissionsRepository = new FakeTransmissionsRepository();

    createTransmisssion = new CreateTransmissionService(
      fakeTransmissionsRepository,
    );
  });

  it('should be able to create new transmission', async () => {
    const transmission = await createTransmisssion.execute({
      name: 'Manual',
    });

    expect(transmission).toHaveProperty('id');
  });

  it('should not be able to create transmission with already existing name', async () => {
    await fakeTransmissionsRepository.create({
      name: 'Manual',
    });

    await expect(
      createTransmisssion.execute({
        name: 'Manual',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
