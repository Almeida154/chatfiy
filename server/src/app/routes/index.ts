import { Router } from 'express';

import {
  SettingController,
  UserController,
  MessageController,
} from '../controllers';

const routes = Router();

routes.post('/settings/create', SettingController.create);

routes.post('/users/create', UserController.create);

routes.post('/messages/create', MessageController.create);
routes.get('/messages/:id', MessageController.showByUser);

export { routes };
