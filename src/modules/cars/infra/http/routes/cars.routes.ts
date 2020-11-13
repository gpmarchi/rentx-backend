import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import CarsController from '../controllers/CarsController';
import carCreateValidator from '../validators/CarCreate';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.use(authenticate);

carsRouter.post('/', carCreateValidator, carsController.create);

export default carsRouter;
