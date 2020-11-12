import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import FakeSpecificationsRepository from '../repositories/fakes/FakeSpecificationsRepository';
import CreateCarService from './CreateCarService';

let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;
let createCar: CreateCarService;

describe('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();

    createCar = new CreateCarService(
      fakeCarsRepository,
      fakeSpecificationsRepository,
    );
  });

  it('should be able to create new car', async () => {
    const specification = await fakeSpecificationsRepository.create({
      name: 'Maximum speed',
      description: 'Maximum speed the car reaches',
      unit: 'km/h',
    });

    const car = await createCar.execute({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [
        {
          id: specification.id,
          value: '320',
        },
      ],
    });

    expect(car).toHaveProperty('id');
    expect(car).toEqual(
      expect.objectContaining({
        specifications: expect.arrayContaining([
          expect.objectContaining({
            id: specification.id,
            value: '320',
          }),
        ]),
      }),
    );
  });

  it('should not be able to create new car with inexistent specification', async () => {
    await expect(
      createCar.execute({
        name: 'Aventador S',
        brand: 'Lamborghini',
        model: 'Aventador',
        daily_rent_value: 500,
        specifications: [
          {
            id: 'inexistent id',
            value: '320',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new car with invalid specification', async () => {
    const specification = await fakeSpecificationsRepository.create({
      name: 'Maximum speed',
      description: 'Maximum speed the car reaches',
      unit: 'km/h',
    });

    await expect(
      createCar.execute({
        name: 'Aventador S',
        brand: 'Lamborghini',
        model: 'Aventador',
        daily_rent_value: 500,
        specifications: [
          {
            id: 'invalid id',
            value: '320',
          },
          {
            id: specification.id,
            value: '320',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new car with no specification', async () => {
    await expect(
      createCar.execute({
        name: 'Aventador S',
        brand: 'Lamborghini',
        model: 'Aventador',
        daily_rent_value: 500,
        specifications: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create car with already existing name', async () => {
    await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [],
    });

    await expect(
      createCar.execute({
        name: 'Aventador S',
        brand: 'Lamborghini',
        model: 'Aventador',
        daily_rent_value: 500,
        specifications: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
