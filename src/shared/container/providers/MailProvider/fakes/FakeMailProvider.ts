import IMailProvider from '../interfaces/IMailProvider';
import IMailDataDTO from '../dto/IMailDataDTO';

class FakeMailProvider implements IMailProvider {
  messages: IMailDataDTO[] = [];

  public async sendMail(message: IMailDataDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
