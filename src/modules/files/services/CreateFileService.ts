import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import File from '../infra/typeorm/entities/File';
import ICreateFileDTO from '../dtos/ICreateFileDTO';
import IFilesRepository from '../repositories/IFilesRepository';

@injectable()
class CreateFileService {
  private filesRepository: IFilesRepository;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('FilesRepository')
    filesRepository: IFilesRepository,
    @inject('StorageProvider')
    storageProvider: IStorageProvider,
  ) {
    this.filesRepository = filesRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({
    original_name,
    filename,
  }: ICreateFileDTO): Promise<File> {
    const file = await this.filesRepository.create({
      original_name,
      filename,
    });

    await this.storageProvider.saveFile(filename);

    return file;
  }
}

export default CreateFileService;
