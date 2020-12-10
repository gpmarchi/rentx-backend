import FakeCarsRepository from '@modules/cars/repositories/fakes/FakeCarsRepository';
import AppError from '@shared/errors/AppError';
import FakeRentalsRepository from '../repositories/fakes/FakeRentalsRepository';
import ListCarRentalAvailabilityByPeriodService from './ListCarRentalAvailabilityByPeriodService';

let fakeRentalsRepository: FakeRentalsRepository;
let fakeCarsRepository: FakeCarsRepository;
let listCarRentalAvailabilityByPeriod: ListCarRentalAvailabilityByPeriodService;

describe('ListCarRentalAvailabilityByPeriod', () => {
  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository();

    listCarRentalAvailabilityByPeriod = new ListCarRentalAvailabilityByPeriodService(
      fakeRentalsRepository,
      fakeCarsRepository,
    );
  });

  it('should be able to list all car available for rental in period', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 0).getTime();
    });

    const car1 = await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [],
      fuel_id: 'fuel_id',
      transmission_id: 'transmission_id',
    });

    const car2 = await fakeCarsRepository.create({
      name: 'Aventador S Roadster',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 600,
      specifications: [],
      fuel_id: 'fuel_id',
      transmission_id: 'transmission_id',
    });

    const car3 = await fakeCarsRepository.create({
      name: 'Aventador SVD',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 600,
      specifications: [],
      fuel_id: 'fuel_id',
      transmission_id: 'transmission_id',
    });

    await fakeRentalsRepository.create({
      car_id: car1.id,
      user_id: 'user id',
      start_date: new Date(2020, 12, 11, 0),
      end_date: new Date(2020, 12, 13, 0),
    });

    const rentals = await listCarRentalAvailabilityByPeriod.execute({
      start_date: new Date(2020, 12, 10, 0),
      end_date: new Date(2020, 12, 20, 0),
    });

    expect(rentals.length).toEqual(2);
    expect(rentals).toEqual([car2, car3]);
  });

  it('should not be able to list all car available for rental in invalid period', async () => {
    await expect(
      listCarRentalAvailabilityByPeriod.execute({
        start_date: new Date(2020, 12, 20, 0),
        end_date: new Date(2020, 12, 10, 0),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
