import AppError from '@shared/errors/AppError';

import FakeFilesRepository from '@modules/files/repositories/fakes/FakeFilesRepository';
import FakeTransmissionsRepository from '../repositories/fakes/FakeTransmissionsRepository';
import CreateTransmissionService from './CreateTransmissionService';

let fakeTransmissionsRepository: FakeTransmissionsRepository;
let fakeFilesRepository: FakeFilesRepository;
let createTransmisssion: CreateTransmissionService;

describe('CreateTransmission', () => {
  beforeEach(() => {
    fakeTransmissionsRepository = new FakeTransmissionsRepository();
    fakeFilesRepository = new FakeFilesRepository();

    createTransmisssion = new CreateTransmissionService(
      fakeTransmissionsRepository,
      fakeFilesRepository,
    );
  });

  it('should be able to create new transmission', async () => {
    const icon = await fakeFilesRepository.create({
      original_name: 'icon original name',
      filename: 'icon filename',
    });

    const transmission = await createTransmisssion.execute({
      name: 'Manual',
      icon_id: icon.id,
    });

    expect(transmission).toHaveProperty('id');
    expect(transmission.icon_id).toBe(icon.id);
  });

  it('should not be able to create transmission with already existing name', async () => {
    const icon = await fakeFilesRepository.create({
      original_name: 'icon orginal name',
      filename: 'icon filename',
    });

    await fakeTransmissionsRepository.create({
      name: 'Manual',
      icon_id: icon.id,
    });

    await expect(
      createTransmisssion.execute({
        name: 'Manual',
        icon_id: icon.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create transmission with invalid icon', async () => {
    await expect(
      createTransmisssion.execute({
        name: 'Manual',
        icon_id: 'some icon',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
