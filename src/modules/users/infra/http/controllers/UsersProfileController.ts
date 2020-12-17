import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

import CarMapper from '@modules/cars/infra/http/mappers/CarMapper';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      email,
      name,
      phone,
      old_password,
      password,
      avatar_id,
    } = request.body;

    const updateUserProfile = container.resolve(UpdateUserProfileService);

    const user = await updateUserProfile.execute({
      user_id,
      email,
      name,
      phone,
      old_password,
      password,
      avatar_id,
    });

    return response.json(classToClass(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUserProfile = container.resolve(ShowUserProfileService);

    const {
      user,
      totalRentals,
      favoriteRental,
    } = await showUserProfile.execute({ user_id });

    const convertedUser = classToClass(user);
    const convertedFavoriteCar = favoriteRental.car
      ? CarMapper.toDTO(favoriteRental.car)
      : undefined;

    return response.json({
      user: convertedUser,
      totalRentals,
      favoriteRental: {
        totalRentals: favoriteRental.totalRentals,
        car: convertedFavoriteCar,
      },
    });
  }
}
