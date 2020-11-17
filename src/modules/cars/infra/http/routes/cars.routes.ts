import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import CarsController from '../controllers/CarsController';

import carCreateValidator from '../validators/CarCreate';
import carListValidator from '../validators/CarList';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.use(authenticate);

carsRouter.post('/', carCreateValidator, carsController.create);
carsRouter.get('/', carListValidator, carsController.index);

export default carsRouter;
