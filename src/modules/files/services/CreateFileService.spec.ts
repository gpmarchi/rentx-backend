import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeFilesRepository from '../repositories/fakes/FakeFilesRepository';
import CreateFileService from './CreateFileService';

let fakeStorageProvider: FakeStorageProvider;
let fakeFilesRepository: FakeFilesRepository;
let createFile: CreateFileService;

describe('CreateFile', () => {
  beforeEach(() => {
    fakeFilesRepository = new FakeFilesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createFile = new CreateFileService(
      fakeFilesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create new file', async () => {
    const saveFile = jest.spyOn(fakeStorageProvider, 'saveFile');

    const file = await createFile.execute({
      original_name: 'original file name',
      filename: 'generated file name',
    });

    expect(file).toHaveProperty('id');
    expect(saveFile).toHaveBeenCalledWith(file.filename);
  });
});
