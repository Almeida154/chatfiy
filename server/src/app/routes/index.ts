import { Router } from 'express';

import { SettingController, UserController } from '../controllers';

const routes = Router();

routes.post('/settings/create', SettingController.create);
routes.post('/users/create', UserController.create);

export { routes };
