import ICreateFileDTO from '@modules/files/dtos/ICreateFileDTO';
import File from '../infra/typeorm/entities/File';

export default interface IFilesRepository {
  create({ original_name, filename, car_id }: ICreateFileDTO): Promise<File>;
}
