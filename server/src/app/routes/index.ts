import { Router } from 'express';

import { SettingController } from '../controllers';

const routes = Router();

routes.post('/settings/create', SettingController.create);

export { routes };
