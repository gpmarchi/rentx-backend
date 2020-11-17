import AppError from '@shared/errors/AppError';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import ShowCarService from './ShowCarService';

let fakeCarsRepository: FakeCarsRepository;
let showCar: ShowCarService;

describe('ShowCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    showCar = new ShowCarService(fakeCarsRepository);
  });

  it('should be able to show car', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Aventador S',
      brand: 'Lamborghini',
      model: 'Aventador',
      daily_rent_value: 500,
      specifications: [],
      fuel_id: 'fuel_id',
      transmission_id: 'transmission_id',
    });

    const searchedCar = await showCar.execute({ car_id: car.id });

    expect(searchedCar).toEqual(car);
  });

  it('should not show inexistent car', async () => {
    await expect(
      showCar.execute({ car_id: 'some car id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
