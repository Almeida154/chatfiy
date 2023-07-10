import AppDataSource from '../data-source';
import { MessageEntity } from '../entities';

const MessageRepository = AppDataSource.getRepository(MessageEntity);

export { MessageRepository };
