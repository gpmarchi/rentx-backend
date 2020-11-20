import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFileService from '@modules/files/services/CreateFileService';

export default class FilesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createFile = container.resolve(CreateFileService);

    const file = await createFile.execute({
      original_name: request.file.originalname,
      filename: request.file.filename,
    });

    return response.json(classToClass(file));
  }
}
