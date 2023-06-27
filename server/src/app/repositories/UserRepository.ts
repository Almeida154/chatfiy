import AppDataSource from '../data-source';
import { UserEntity } from '../entities';

const UserRepository = AppDataSource.getRepository(UserEntity);

export { UserRepository };
