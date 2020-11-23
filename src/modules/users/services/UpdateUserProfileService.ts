import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

interface IRequestDTO {
  user_id: string;
  email?: string;
  name?: string;
  phone?: string;
  old_password?: string;
  password?: string;
  avatar_id?: string;
}

@injectable()
class UpdateUserProfileService {
  private usersRepository: IUsersRepository;

  private filesRepository: IFilesRepository;

  private hashProvider: IHashProvider;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('FilesRepository')
    filesRepository: IFilesRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
    @inject('StorageProvider')
    storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository;
    this.filesRepository = filesRepository;
    this.hashProvider = hashProvider;
    this.storageProvider = storageProvider;
  }

  public async execute({
    user_id,
    email,
    name,
    phone,
    old_password,
    password,
    avatar_id,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists.', 400);
    }

    if (email) {
      const userWithUpdatedEmail = await this.usersRepository.findByEmail(
        email,
      );

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
        throw new AppError('Provided email is already registered.', 400);
      }

      user.email = email;
    }

    Object.assign(user, { name, phone });

    if (password && !old_password) {
      throw new AppError('Old password must be provided.', 400);
    }

    if (password && old_password) {
      const oldPasswordMatches = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!oldPasswordMatches) {
        throw new AppError('Old password does not match.', 400);
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    const { filename: currentAvatarFilename } = user.avatar;

    if (avatar_id) {
      const avatar = await this.filesRepository.findById(avatar_id);

      if (!avatar) {
        throw new AppError('Avatar file not found.');
      }

      user.avatar = avatar;
    }

    const currentAvatarId = user.avatar_id;

    await this.usersRepository.save(user);

    if (currentAvatarId && avatar_id) {
      await this.filesRepository.delete(currentAvatarId);
      await this.storageProvider.deleteFile(currentAvatarFilename);
    }

    return user;
  }
}

export default UpdateUserProfileService;
