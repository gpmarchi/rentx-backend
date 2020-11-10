import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface IMailDataDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  template: IParseMailTemplateDTO;
}
