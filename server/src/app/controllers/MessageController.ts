import { Request, Response } from 'express';

import { SettingService } from '../services';
import MessageService from '../services/MessageService';

class MessageController {
  create = async (req: Request, res: Response) => {
    const { admin_id, user_id, text } = req.body;

    try {
      const message = await MessageService.create({ admin_id, user_id, text });
      return res.json(message);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  };

  showByUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const messages = await MessageService.getByUser(id);
      return res.json(messages);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  };
}

export default new MessageController();
