import { Router } from 'express';

import authenticate from '@modules/users/infra/http/middlewares/authenticate';
import TransmissionsController from '../controllers/TransmissionsController';
import transmissionCreateValidator from '../validators/TransmissionCreate';

const transmissionsRouter = Router();
const transmissionsController = new TransmissionsController();

transmissionsRouter.use(authenticate);

transmissionsRouter.post(
  '/',
  transmissionCreateValidator,
  transmissionsController.create,
);

export default transmissionsRouter;
