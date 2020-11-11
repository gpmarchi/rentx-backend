import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPasswordRecoveryTokensRepository from '@modules/users/repositories/IPasswordRecoveryTokensRepository';
import PasswordRecoveryTokensRepository from '@modules/users/infra/typeorm/repositories/PasswordRecoveryTokensRepository';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPasswordRecoveryTokensRepository>(
  'PasswordRecoveryTokensRepository',
  PasswordRecoveryTokensRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
