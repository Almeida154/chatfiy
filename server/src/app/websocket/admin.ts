import { Server, Socket } from 'socket.io';
import { ConnectionService, MessageService } from '../services';

interface IGetMessagesByUser {
  userId: string;
}

interface ISendAdminMessage {
  text: string;
  userId: string;
}

class AdminWS {
  private socket: Socket | null = null;
  private io: Server | null = null;

  private emitAllConnections = async () => {
    const connections = await ConnectionService.findAll();
    this.socket.emit('admin_connections_list', connections);
  };

  private getMessagesByUser = async ({ userId }: IGetMessagesByUser) => {
    const messages = await MessageService.getByUser(userId);
    this.socket.emit('admin_all_messages_by_user', messages);
  };

  private sendAdminMessage = async ({ text, userId }: ISendAdminMessage) => {
    const message = await MessageService.create({
      text,
      user_id: userId,
      admin_id: this.socket.id,
    });

    const connection = await ConnectionService.findByUserId({ id: userId });

    if (connection.admin_id === null) {
      connection.admin_id = this.socket.id;
      await ConnectionService.create(connection);
      this.emitAllConnections();
    }

    this.io.to(connection.socket_id).emit('admin_message_sent', {
      msg: message,
      socketId: this.socket.id,
    });
  };

  public listen = (io: Server) => {
    this.io = io;

    io.on('connect', (socket) => {
      this.socket = socket;
      this.emitAllConnections();

      socket.on('admin_get_messages_by_user', this.getMessagesByUser);
      socket.on('send_admin_message', this.sendAdminMessage);
    });
  };
}

export default new AdminWS();
