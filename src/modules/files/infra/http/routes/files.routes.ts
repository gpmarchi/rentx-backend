import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import FilesController from '../controllers/FilesController';

const filesRouter = Router();
const filesController = new FilesController();
const upload = multer(uploadConfig.multer);

filesRouter.post(
  '/',
  authenticate,
  upload.single('file'),
  filesController.create,
);

export default filesRouter;
