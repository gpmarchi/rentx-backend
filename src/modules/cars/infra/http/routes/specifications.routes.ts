import { Router } from 'express';

import SpecificationsController from '../controllers/SpecificationsController';

import specificationCreateValidator from '../validators/SpecificationCreate';

const specificationsRouter = Router();
const specificationsController = new SpecificationsController();

specificationsRouter.post(
  '/',
  specificationCreateValidator,
  specificationsController.create,
);

export default specificationsRouter;
