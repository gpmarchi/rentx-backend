import { Router } from 'express';

import CarsController from '../controllers/CarsController';

import carCreateValidator from '../validators/CarCreate';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.post('/', carCreateValidator, carsController.create);

export default carsRouter;
