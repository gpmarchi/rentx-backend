import AppError from '@shared/errors/AppError';

import FakeFilesRepository from '@modules/files/repositories/fakes/FakeFilesRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarImagesService from './CreateCarImagesService';

let fakeCarsRepository: FakeCarsRepository;
let fakeFilesRepository: FakeFilesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createCarImages: CreateCarImagesService;

describe('CreateCarImages', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeFilesRepository = new FakeFilesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createCarImages = new CreateCarImagesService(
      fakeCarsRepository,
      fakeFilesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to upload car images', async () => {
    const saveFile = jest.spyOn(fakeStorageProvider, 'saveFile');

    const car = await fakeCarsRepository.create({
      brand: 'Ford',
      model: 'Ka',
      name: 'Ford Ka Freestyle',
      daily_rent_value: 400,
      specifications: [],
      fuel_id: 'fuel id',
      transmission_id: 'transmission_id',
    });

    const images = [
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
    ];

    const files = await createCarImages.execute({
      car_id: car.id,
      images,
    });

    expect(files[0]).toHaveProperty('id');
    expect(saveFile).toHaveBeenCalledWith(files[0].filename);
  });

  it('should be able to upload partial car images', async () => {
    const saveFile = jest.spyOn(fakeStorageProvider, 'saveFile');

    const car = await fakeCarsRepository.create({
      brand: 'Ford',
      model: 'Ka',
      name: 'Ford Ka Freestyle',
      daily_rent_value: 400,
      specifications: [],
      fuel_id: 'fuel id',
      transmission_id: 'transmission_id',
    });

    const images = [
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
    ];

    await createCarImages.execute({
      car_id: car.id,
      images,
    });

    await createCarImages.execute({
      car_id: car.id,
      images: [
        {
          fieldname: 'carImages',
          originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: '/Documents/Projetos/rentx-backend/tmp',
          filename: '42e1d7eb124cc90a6dc8.jpg',
          path:
            '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
          size: 1593612,
        },
      ],
    });

    const carImages = await fakeFilesRepository.findByCarId(car.id);

    expect(carImages.length).toBe(4);
    expect(saveFile).toHaveBeenCalledTimes(4);
  });

  it('should be not able to upload car images for inexistent car', async () => {
    const images = [
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
    ];

    await expect(
      createCarImages.execute({
        car_id: 'car id',
        images,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to upload car images if car already have max number of images', async () => {
    const deleteTmpFile = jest.spyOn(fakeStorageProvider, 'deleteTmpFile');

    const car = await fakeCarsRepository.create({
      brand: 'Ford',
      model: 'Ka',
      name: 'Ford Ka Freestyle',
      daily_rent_value: 400,
      specifications: [],
      fuel_id: 'fuel id',
      transmission_id: 'transmission_id',
    });

    const images = [
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
    ];

    await createCarImages.execute({
      car_id: car.id,
      images,
    });

    await expect(
      createCarImages.execute({
        car_id: car.id,
        images,
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(deleteTmpFile).toHaveBeenCalled();
  });

  it('should be not able to upload max number of car images if car already have some images', async () => {
    const deleteTmpFile = jest.spyOn(fakeStorageProvider, 'deleteTmpFile');

    const car = await fakeCarsRepository.create({
      brand: 'Ford',
      model: 'Ka',
      name: 'Ford Ka Freestyle',
      daily_rent_value: 400,
      specifications: [],
      fuel_id: 'fuel id',
      transmission_id: 'transmission_id',
    });

    const images = [
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
      {
        fieldname: 'carImages',
        originalname: 'bugatti-chiron-pur-sport-106-1582836604.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Documents/Projetos/rentx-backend/tmp',
        filename: '42e1d7eb124cc90a6dc8.jpg',
        path: '/Documents/Projetos/rentx-backend/tmp/42e1d7eb124cc90a6dc8.jpg',
        size: 1593612,
      },
    ];

    await createCarImages.execute({
      car_id: car.id,
      images,
    });

    await expect(
      createCarImages.execute({
        car_id: car.id,
        images,
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(deleteTmpFile).toHaveBeenCalled();
  });
});
