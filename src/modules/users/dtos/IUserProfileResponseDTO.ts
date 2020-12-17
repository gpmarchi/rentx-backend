import User from '@modules/users/infra/typeorm/entities/User';
import Car from '@modules/cars/infra/typeorm/entities/Car';

interface IFavoriteRental {
  totalRentals: number;
  car: Car | undefined;
}

export default interface IUserProfileResponseDTO {
  user: User;
  totalRentals: number;
  favoriteRental: IFavoriteRental;
}
