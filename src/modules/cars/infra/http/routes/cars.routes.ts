import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import CarsController from '../controllers/CarsController';
import CarsFilesController from '../controllers/CarsFilesController';

import carCreateValidator from '../validators/CarCreate';
import carListValidator from '../validators/CarList';
import showCarValidator from '../validators/CarShow';

const carsRouter = Router();
const carsController = new CarsController();
const carsFilesController = new CarsFilesController();
const upload = multer(uploadConfig.multer);

carsRouter.use(authenticate);

carsRouter.post('/', carCreateValidator, carsController.create);
carsRouter.get('/', carListValidator, carsController.index);
carsRouter.get('/:id', showCarValidator, carsController.show);

carsRouter.post(
  '/images',
  upload.array('carImages', Number(process.env.MAX_IMAGES_PER_CAR)),
  carsFilesController.create,
);

export default carsRouter;
