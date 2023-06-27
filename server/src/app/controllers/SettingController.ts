import { Request, Response } from 'express';

import { SettingService } from '../services';

class SettingController {
  create = async (req: Request, res: Response) => {
    const { chat, username } = req.body;

    try {
      const setting = await SettingService.create({ chat, username });
      return res.json(setting);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  };
}

export default new SettingController();
