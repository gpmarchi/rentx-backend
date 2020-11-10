import { v4 as uuidv4 } from 'uuid';

import IPasswordRecoveryTokenRepository from '../IPasswordRecoveryTokensRepository';

import PasswordRecoveryToken from '../../infra/typeorm/entities/PasswordRecoveryToken';

class FakePasswordRecoveryTokensRepository
  implements IPasswordRecoveryTokenRepository {
  private recoveryTokens: PasswordRecoveryToken[] = [];

  public async create(user_id: string): Promise<PasswordRecoveryToken> {
    const passwordRecoveryToken = new PasswordRecoveryToken();

    Object.assign(passwordRecoveryToken, {
      id: uuidv4(),
      token: uuidv4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.recoveryTokens.push(passwordRecoveryToken);

    return passwordRecoveryToken;
  }

  public async findByToken(
    token: string,
  ): Promise<PasswordRecoveryToken | undefined> {
    const recoveryToken = this.recoveryTokens.find(
      currentRecoveryToken => currentRecoveryToken.token === token,
    );

    return recoveryToken;
  }
}

export default FakePasswordRecoveryTokensRepository;
