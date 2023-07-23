import AppDataSource from '../data-source';
import { ConnectionEntity } from '../entities';

const ConnectionRepository = AppDataSource.getRepository(ConnectionEntity);

export { ConnectionRepository };
