import { Request, Response } from 'express';

import { SettingService } from '../services';

class SettingController {
  create = async (req: Request, res: Response) => {
    const { chat, username } = req.body;

    const settingService = new SettingService();

    const setting = await settingService.create({ chat, username });

    return res.json(setting);
  };
}

export default new SettingController();
