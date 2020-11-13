import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import SpecificationsController from '../controllers/SpecificationsController';
import specificationCreateValidator from '../validators/SpecificationCreate';

const specificationsRouter = Router();
const specificationsController = new SpecificationsController();

specificationsRouter.use(authenticate);

specificationsRouter.post(
  '/',
  specificationCreateValidator,
  specificationsController.create,
);

export default specificationsRouter;
