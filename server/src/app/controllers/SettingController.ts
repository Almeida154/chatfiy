import { Request, Response } from 'express';

class SettingController {
  create = async (req: Request, res: Response) => {
    console.log(req);
    res.json({ ok: true });
  };
}

export default new SettingController();
