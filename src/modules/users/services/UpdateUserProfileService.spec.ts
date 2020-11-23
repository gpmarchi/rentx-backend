import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeFilesRepository from '@modules/files/repositories/fakes/FakeFilesRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeFilesRepository: FakeFilesRepository;
let fakeHashProvider: FakeHashProvider;
let fakeStorageProvider: FakeStorageProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFilesRepository = new FakeFilesRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeFilesRepository,
      fakeHashProvider,
      fakeStorageProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John',
      email: 'john@email.com',
    });

    expect(updatedUser.name).toBe('John');
  });

  it('should be able to update user password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should be able to update user avatar', async () => {
    const deleteFile = jest.spyOn(fakeFilesRepository, 'delete');
    const removeFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const file1 = await fakeFilesRepository.create({
      original_name: 'original file name 1',
      filename: 'generated file name 1',
    });

    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await updateUserProfile.execute({
      user_id: user.id,
      avatar_id: file1.id,
    });

    const file2 = await fakeFilesRepository.create({
      original_name: 'original file name 2',
      filename: 'generated file name 2',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      avatar_id: file2.id,
    });

    expect(updatedUser.avatar_id).toBe(file2.id);
    expect(deleteFile).toHaveBeenCalledWith(file1.id);
    expect(removeFile).toHaveBeenCalled();
  });

  it('should not be able to update user with invalid avatar', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        avatar_id: 'avatar id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update inexistent user profile', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'owiueriowu',
        name: 'John',
        email: 'john@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user profile with already registered email', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    const user = await fakeUsersRepository.create({
      email: 'mike@email.com',
      password: '123456',
      name: 'Mike',
      phone: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password without providing old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password if old password does not match', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      name: 'John Doe',
      phone: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        password: '123123',
        old_password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
