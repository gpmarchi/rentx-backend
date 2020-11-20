import { Repository, getRepository } from 'typeorm';

import ICreateFileDTO from '@modules/files/dtos/ICreateFileDTO';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import File from '../entities/File';

class FilesRepository implements IFilesRepository {
  private ormRepository: Repository<File>;

  constructor() {
    this.ormRepository = getRepository(File);
  }

  public async create({
    original_name,
    filename,
    car_id,
  }: ICreateFileDTO): Promise<File> {
    const file = this.ormRepository.create({
      original_name,
      filename,
      car_id,
    });

    await this.ormRepository.save(file);

    return file;
  }
}

export default FilesRepository;
