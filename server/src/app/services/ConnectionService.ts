import { ConnectionRepository } from '../repositories';

interface ICreate {
  id?: string;
  admin_id?: string;
  socket_id: string;
  user_id: string;
}

class ConnectionService {
  create = async ({ id, admin_id = null, socket_id, user_id }: ICreate) => {
    const connection = ConnectionRepository.create({
      socket_id,
      admin_id,
      user_id,
      id,
    });

    await ConnectionRepository.save(connection);
    return connection;
  };

  findByUserId = async ({ id }) => {
    const connection = await ConnectionRepository.findOne({
      where: { user_id: id },
    });

    return connection;
  };

  findOrCreate = async ({ id, admin_id = null, socket_id, user_id }: ICreate) => {
    let connection = await ConnectionRepository.findOne({ where: { user_id } });

    if (!connection) {
      connection = ConnectionRepository.create({ socket_id, admin_id, user_id, id });
      await ConnectionRepository.save(connection);
    } else {
      connection.socket_id = socket_id;
      await ConnectionRepository.save(connection);
    }

    return connection;
  };
}

export default new ConnectionService();
