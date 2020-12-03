import { addDays } from 'date-fns';

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
      daily_rent_value: 100,
    });

    expect(rental).toHaveProperty('id');
  });
});
