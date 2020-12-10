import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import RentalsController from '../controllers/RentalsController';
import CarRentalAvailabilityController from '../controllers/CarRentalAvailabilityController';
import createRentalValidator from '../validators/RentalCreate';
import carAvailabilityListValidator from '../validators/CarAvailabilityList';

const rentalsRouter = Router();
const rentalsController = new RentalsController();
const carRentalAvailabilityController = new CarRentalAvailabilityController();

rentalsRouter.use(authenticate);

rentalsRouter.post('/', createRentalValidator, rentalsController.create);
rentalsRouter.get('/', rentalsController.index);

rentalsRouter.get(
  '/availability',
  carAvailabilityListValidator,
  carRentalAvailabilityController.index,
);

export default rentalsRouter;
