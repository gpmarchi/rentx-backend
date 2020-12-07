import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import RentalsController from '../controllers/RentalsController';
import createRentalValidator from '../validators/RentalCreate';

const rentalsRouter = Router();
const rentalsController = new RentalsController();

rentalsRouter.use(authenticate);

rentalsRouter.post('/', createRentalValidator, rentalsController.create);
rentalsRouter.get('/', rentalsController.index);

export default rentalsRouter;
