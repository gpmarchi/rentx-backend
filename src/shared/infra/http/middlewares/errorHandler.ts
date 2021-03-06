import { Request, Response, NextFunction } from 'express';
import { CelebrateError } from 'celebrate';
import { MulterError } from 'multer';

import AppError from '@shared/errors/AppError';

export default function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof CelebrateError) {
    const errorMap = error.details;

    let message;

    errorMap.forEach((value, key) => {
      message = `[${key}] ${value.message}`;
    });

    return response.status(400).json({
      status: 'error',
      message,
    });
  }

  if (error instanceof MulterError && error.code === 'LIMIT_UNEXPECTED_FILE') {
    return response.status(400).json({
      status: 'error',
      message: `${error.message} ${error.field}, max image uploads allowed are ${process.env.MAX_IMAGES_PER_CAR}`,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
