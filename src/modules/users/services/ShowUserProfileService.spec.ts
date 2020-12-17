import AppError from '@shared/errors/AppError';

import FakeRentalsRepository from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCarsRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeRentalsRepository: FakeRentalsRepository;
let fakeCarsRepository: FakeCarsRepository;
let showUserProfile: ShowUserProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository();

    showUserProfile = new ShowUserProfileService(
      fakeUsersRepository,
      fakeRentalsRepository,
      fakeCarsRepository,
    );
  });

  it('should be able to show user profile', async () => {
    const createdUser = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await fakeRentalsRepository.create({
      car_id: 'car id',
      user_id: createdUser.id,
      daily_rent_value: 500,
      start_date: new Date(),
      end_date: new Date(),
    });

    const {
      user,
      totalRentals,
      favoriteRental,
    } = await showUserProfile.execute({
      user_id: createdUser.id,
    });

    expect(user).toMatchObject(createdUser);
    expect(totalRentals).toBe(1);
    expect(favoriteRental).toBeTruthy();
  });

  it('should not show inexistent user profile', async () => {
    await expect(
      showUserProfile.execute({ user_id: '99999' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
