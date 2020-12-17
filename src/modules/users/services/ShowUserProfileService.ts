import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserProfileResponseDTO from '../dtos/IUserProfileResponseDTO';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ShowUserProfileService {
  private usersRepository: IUsersRepository;

  private rentalsRepository: IRentalsRepository;

  private carsRepository: ICarsRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('RentalsRepository')
    rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    carsRepository: ICarsRepository,
  ) {
    this.usersRepository = usersRepository;
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
  }

  public async execute({
    user_id,
  }: IRequestDTO): Promise<IUserProfileResponseDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const totalRentals = await this.rentalsRepository.countAllFromUser(user_id);

    const {
      totalFavoriteRentals,
      car_id,
    } = await this.rentalsRepository.findUserMostRentedCar(user_id);

    let favoriteCar;

    if (car_id) {
      favoriteCar = await this.carsRepository.findById(car_id);
    }

    const favoriteRental = {
      totalRentals: totalFavoriteRentals,
      car: favoriteCar,
    };

    return { user, totalRentals, favoriteRental };
  }
}

export default ShowUserProfileService;
