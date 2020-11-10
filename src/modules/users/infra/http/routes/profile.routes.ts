import { Router } from 'express';

import authenticate from '../middlewares/authenticate';

import profileUpdateValidator from '../validators/UserProfileUpdate';

import UsersProfileController from '../controllers/UsersProfileController';

const profileRouter = Router();
const profileController = new UsersProfileController();

profileRouter.patch(
  '/',
  authenticate,
  profileUpdateValidator,
  profileController.update,
);

profileRouter.get('/', authenticate, profileController.show);

export default profileRouter;
