import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import CarsController from '../controllers/CarsController';

import carCreateValidator from '../validators/CarCreate';
import carListValidator from '../validators/CarList';
import showCarValidator from '../validators/CarShow';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.use(authenticate);

carsRouter.post('/', carCreateValidator, carsController.create);
carsRouter.get('/', carListValidator, carsController.index);
carsRouter.get('/:id', showCarValidator, carsController.show);

export default carsRouter;
