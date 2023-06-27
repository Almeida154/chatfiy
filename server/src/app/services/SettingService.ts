import { ERROR } from '../constants';
import { ErrorHandler } from '../models';
import { SettingRepository } from '../repositories';

interface ICreate {
  chat: boolean;
  username: string;
}

class SettingService {
  create = async ({ chat, username }: ICreate) => {
    const isUsernameInUse = await SettingRepository.findOne({ where: { username } });

    if (isUsernameInUse)
      throw new ErrorHandler('Username already in use', ERROR.DUPLICATE_FOUND);

    const setting = SettingRepository.create({ chat, username });
    await SettingRepository.save(setting);

    return setting;
  };
}

export default new SettingService();
