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

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<File | undefined> {
    const file = await this.ormRepository.findOne(id);

    return file;
  }

  public async findByCarId(car_id: string): Promise<File[]> {
    const files = await this.ormRepository.find({ where: { car_id } });

    return files;
  }
}

export default FilesRepository;
