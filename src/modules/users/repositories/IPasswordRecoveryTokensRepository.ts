import PasswordRecoveryToken from '../infra/typeorm/entities/PasswordRecoveryToken';

export default interface IPasswordRecoveryTokensRepository {
  create(user_id: string): Promise<PasswordRecoveryToken>;
  findByToken(token: string): Promise<PasswordRecoveryToken | undefined>;
}
