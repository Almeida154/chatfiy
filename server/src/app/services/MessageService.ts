import { MessageRepository } from '../repositories';

interface ICreate {
  text: string;
  admin_id?: string;
  user_id: string;
}

class MessageService {
  create = async ({ admin_id = null, user_id, text }: ICreate) => {
    const message = MessageRepository.create({ admin_id, user_id, text });
    await MessageRepository.save(message);

    return message;
  };

  getByUser = async (id: string) => {
    const messages = MessageRepository.find({
      where: { user_id: id },
      relations: {
        user: true,
      },
    });

    return messages;
  };
}

export default new MessageService();
