import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import FuelsController from '../controllers/FuelsController';
import fuelCreateValidator from '../validators/FuelCreate';

const fuelsRouter = Router();
const fuelsController = new FuelsController();

fuelsRouter.use(authenticate);

fuelsRouter.post('/', fuelCreateValidator, fuelsController.create);

export default fuelsRouter;
