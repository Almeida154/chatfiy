import { SettingRepository } from '../repositories';

interface ICreate {
  chat: boolean;
  username: string;
}

class SettingService {
  create = async ({ chat, username }: ICreate) => {
    const setting = SettingRepository.create({ chat, username });
    await SettingRepository.save(setting);

    return setting;
  };
}

export { SettingService };
