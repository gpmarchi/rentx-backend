import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPasswordRecoveryTokensRepository from '@modules/users/repositories/IPasswordRecoveryTokensRepository';
import PasswordRecoveryTokensRepository from '@modules/users/infra/typeorm/repositories/PasswordRecoveryTokensRepository';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import IFuelsRepository from '@modules/cars/repositories/IFuelsRepository';
import FuelsRepository from '@modules/cars/infra/typeorm/repositories/FuelsRepository';

import ITransmissionsRepository from '@modules/cars/repositories/ITransmissionsRepository';
import TransmissionsRepository from '@modules/cars/infra/typeorm/repositories/TransmissionsRepository';

import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import FilesRepository from '@modules/files/infra/typeorm/repositories/FilesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPasswordRecoveryTokensRepository>(
  'PasswordRecoveryTokensRepository',
  PasswordRecoveryTokensRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IFuelsRepository>(
  'FuelsRepository',
  FuelsRepository,
);

container.registerSingleton<ITransmissionsRepository>(
  'TransmissionsRepository',
  TransmissionsRepository,
);

container.registerSingleton<IFilesRepository>(
  'FilesRepository',
  FilesRepository,
);
