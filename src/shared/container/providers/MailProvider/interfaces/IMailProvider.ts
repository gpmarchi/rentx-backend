import IMailDataDTO from '../dto/IMailDataDTO';

export default interface IMailProvider {
  sendMail(message: IMailDataDTO): Promise<void>;
}
