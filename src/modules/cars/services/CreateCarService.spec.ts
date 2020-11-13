import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import FakeSpecificationsRepository from '../repositories/fakes/FakeSpecificationsRepository';
import FakeFuelsRepository from '../repositories/fakes/FakeFuelsRepository';
import FakeTransmissionsRepository from '../repositories/fakes/FakeTransmissionsRepository';
import CreateCarService from './CreateCarService';

let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;
let fakeFuelsRepository: FakeFuelsRepository;
let fakeTransmissionsRepository: FakeTransmissionsRepository;
let createCar: CreateCarService;

describe('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    fakeFuelsRepository = new FakeFuelsRepository();
    fakeTransmissionsRepository = new FakeTransmissionsRepository();

    createCar = new CreateCarService(
      fakeCarsRepository,
      fakeSpecificationsRepository,
      fakeFuelsRepository,
      fakeTransmissionsRepository,
    );
  });

  it('should be able to create new car', async () => {
    const specification = await fakeSpecificationsRepository.create({
      name: 'Maximum speed',
      description: 'Maximum speed the car reaches',
      unit: 'km/h',
    });

    const fuel = await fakeFuelsRepository.create({
      name: 'Gasoline',
    });

    const transmission = await fakeTransmissionsRepository.create({
      name: 'Manual',
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
      fuel_id: fuel.id,
      transmission_id: transmission.id,
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
    expect(car).toHaveProperty('fuel_id');
    expect(car).toHaveProperty('transmission_id');
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
        fuel_id: 'fuel_id',
        transmission_id: 'transmission_id',
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
        fuel_id: 'fuel_id',
        transmission_id: 'transmission_id',
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
        fuel_id: 'fuel_id',
        transmission_id: 'transmission_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new car with invalid fuel', async () => {
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
            id: specification.id,
            value: '320',
          },
        ],
        fuel_id: 'fuel_id',
        transmission_id: 'transmission_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new car with invalid transmission', async () => {
    const specification = await fakeSpecificationsRepository.create({
      name: 'Maximum speed',
      description: 'Maximum speed the car reaches',
      unit: 'km/h',
    });

    const fuel = await fakeFuelsRepository.create({
      name: 'Gasoline',
    });

    await expect(
      createCar.execute({
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
        fuel_id: fuel.id,
        transmission_id: 'transmission_id',
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
      fuel_id: 'fuel_id',
      transmission_id: 'transmission_id',
    });

    await expect(
      createCar.execute({
        name: 'Aventador S',
        brand: 'Lamborghini',
        model: 'Aventador',
        daily_rent_value: 500,
        specifications: [],
        fuel_id: 'fuel_id',
        transmission_id: 'transmission_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
