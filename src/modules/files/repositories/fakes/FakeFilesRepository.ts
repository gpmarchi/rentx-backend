import { v4 as uuidv4 } from 'uuid';

import ICreateFileDTO from '@modules/files/dtos/ICreateFileDTO';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import File from '../../infra/typeorm/entities/File';

class FakeFilesRepository implements IFilesRepository {
  private files: File[] = [];

  public async create({
    original_name,
    filename,
    car_id,
  }: ICreateFileDTO): Promise<File> {
    const file = new File();

    Object.assign(file, {
      id: uuidv4(),
      original_name,
      filename,
      car_id,
    });

    this.files.push(file);

    return file;
  }

  public async delete(id: string): Promise<void> {
    this.files.filter(file => file.id === id);
  }

  public async findById(id: string): Promise<File | undefined> {
    const file = this.files.find(currentFile => currentFile.id === id);

    return file;
  }
}

export default FakeFilesRepository;
