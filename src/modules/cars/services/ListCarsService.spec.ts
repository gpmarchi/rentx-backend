import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import ListCarsService from './ListCarsService';

let fakeCarsRepository: FakeCarsRepository;
let listCars: ListCarsService;

describe('ListCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    listCars = new ListCarsService(fakeCarsRepository);
  });

  it('should be able to list all cars', async () => {
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

    const paginatedResponse = await listCars.execute({ page: 1, limit: 20 });

    expect(paginatedResponse.data).toEqual([car1, car2]);
  });
});
