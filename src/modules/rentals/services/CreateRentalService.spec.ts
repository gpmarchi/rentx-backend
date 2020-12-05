import { addDays, subDays } from 'date-fns';

import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCarsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRentalsRepository from '../repositories/fakes/FakeRentalsRepository';
import CreateRentalService from './CreateRentalService';

let fakeCarsRepository: FakeCarsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeRentalsRepository: FakeRentalsRepository;
let createRental: CreateRentalService;

describe('CreateRental', () => {
  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createRental = new CreateRentalService(
      fakeRentalsRepository,
      fakeCarsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create new rental', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [
        {
          specification_id: 'specification id',
          value: '320',
        },
      ],
      fuel_id: 'fuel id',
      transmission_id: 'transmission id',
    });

    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    const rental = await createRental.execute({
      car_id: car.id,
      user_id: user.id,
      start_date: addDays(new Date(), 3),
      end_date: addDays(new Date(), 5),
      daily_rent_value: car.daily_rent_value,
    });

    expect(rental).toHaveProperty('id');
    expect(rental.total).toBe(1000);
  });

  it('should be not able to create new rental for inexistent car', async () => {
    await expect(
      createRental.execute({
        car_id: 'car id',
        user_id: 'user id',
        start_date: addDays(new Date(), 3),
        end_date: addDays(new Date(), 5),
        daily_rent_value: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to create new rental for inexistent user', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [
        {
          specification_id: 'specification id',
          value: '320',
        },
      ],
      fuel_id: 'fuel id',
      transmission_id: 'transmission id',
    });

    await expect(
      createRental.execute({
        car_id: car.id,
        user_id: 'user id',
        start_date: addDays(new Date(), 3),
        end_date: addDays(new Date(), 5),
        daily_rent_value: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to create new rental with invalid start date', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [
        {
          specification_id: 'specification id',
          value: '320',
        },
      ],
      fuel_id: 'fuel id',
      transmission_id: 'transmission id',
    });

    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await expect(
      createRental.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: subDays(new Date(), 3),
        end_date: addDays(new Date(), 5),
        daily_rent_value: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to create new rental with invalid end date', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [
        {
          specification_id: 'specification id',
          value: '320',
        },
      ],
      fuel_id: 'fuel id',
      transmission_id: 'transmission id',
    });

    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await expect(
      createRental.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: addDays(new Date(), 3),
        end_date: subDays(new Date(), 5),
        daily_rent_value: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be not able to create new rental with invalid date period', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [
        {
          specification_id: 'specification id',
          value: '320',
        },
      ],
      fuel_id: 'fuel id',
      transmission_id: 'transmission id',
    });

    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await expect(
      createRental.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: addDays(new Date(), 6),
        end_date: addDays(new Date(), 3),
        daily_rent_value: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be not able to create new rental for same car on same period as another rental', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [
        {
          specification_id: 'specification id',
          value: '320',
        },
      ],
      fuel_id: 'fuel id',
      transmission_id: 'transmission id',
    });

    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await createRental.execute({
      car_id: car.id,
      user_id: user.id,
      start_date: addDays(new Date(), 3),
      end_date: addDays(new Date(), 5),
      daily_rent_value: car.daily_rent_value,
    });

    await expect(
      createRental.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: addDays(new Date(), 3),
        end_date: addDays(new Date(), 5),
        daily_rent_value: car.daily_rent_value,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
