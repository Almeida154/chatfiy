import { Request, Response } from 'express';

import { UserService } from '../services';

class UserController {
  create = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    try {
      const user = await UserService.create({ email });
      return res.json(user);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  };
}

export default new UserController();
