import AppDataSource from '../data-source';
import { SettingEntity } from '../entities';

const SettingRepository = AppDataSource.getRepository(SettingEntity).extend({});

export { SettingRepository };