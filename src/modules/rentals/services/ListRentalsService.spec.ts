import FakeRentalsRepository from '../repositories/fakes/FakeRentalsRepository';
import ListRentalsService from './ListRentalsService';

let fakeRentalsRepository: FakeRentalsRepository;
let listRentals: ListRentalsService;

describe('ListRentals', () => {
  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();

    listRentals = new ListRentalsService(fakeRentalsRepository);
  });

  it('should be able to list all rentals from logged in user', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 12, 10, 0).getTime();
    });

    const rental1 = await fakeRentalsRepository.create({
      car_id: 'car id',
      user_id: 'user id',
      start_date: new Date(2020, 12, 16),
      end_date: new Date(2020, 12, 20),
    });

    const rental2 = await fakeRentalsRepository.create({
      car_id: 'car id',
      user_id: 'user id',
      start_date: new Date(2020, 12, 10),
      end_date: new Date(2020, 12, 20),
    });

    const rental3 = await fakeRentalsRepository.create({
      car_id: 'car id',
      user_id: 'user id',
      start_date: new Date(2020, 12, 1),
      end_date: new Date(2020, 12, 20),
    });

    const rentals = await listRentals.execute('user id');

    expect(rentals.length).toEqual(3);
    expect(rentals).toEqual([rental1, rental2, rental3]);
  });
});
