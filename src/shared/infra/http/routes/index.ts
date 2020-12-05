import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import carsRouter from '@modules/cars/infra/http/routes/cars.routes';
import specificationsRouter from '@modules/cars/infra/http/routes/specifications.routes';
import fuelsRouter from '@modules/cars/infra/http/routes/fuels.routes';
import transmissionsRouter from '@modules/cars/infra/http/routes/transmissions.routes';
import filesRouter from '@modules/files/infra/http/routes/files.routes';
import rentalsRouter from '@modules/rentals/infra/http/routes/rentals.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/cars', carsRouter);
routes.use('/specifications', specificationsRouter);
routes.use('/fuels', fuelsRouter);
routes.use('/transmissions', transmissionsRouter);
routes.use('/files', filesRouter);
routes.use('/rentals', rentalsRouter);

export default routes;
