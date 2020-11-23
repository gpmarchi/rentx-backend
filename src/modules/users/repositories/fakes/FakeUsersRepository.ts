import { v4 as uuidv4 } from 'uuid';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import File from '@modules/files/infra/typeorm/entities/File';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(currentUser => currentUser.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(currentUser => currentUser.email === email);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidv4() }, userData, { avatar: new File() });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      currentUser => currentUser.id === user.id,
    );

    const updatedUser = user;

    const userAvatar = updatedUser.avatar;

    if (userAvatar) {
      updatedUser.avatar_id = userAvatar.id;
    }

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }
}

export default FakeUsersRepository;
