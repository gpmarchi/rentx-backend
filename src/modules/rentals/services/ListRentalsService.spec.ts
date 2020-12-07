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
    const rental = await fakeRentalsRepository.create({
      car_id: 'car id',
      user_id: 'user id',
      start_date: new Date(),
      end_date: new Date(),
    });

    const rentals = await listRentals.execute('user id');

    expect(rentals[0]).toEqual(rental);
  });
});
