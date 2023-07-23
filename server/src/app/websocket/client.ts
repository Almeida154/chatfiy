import { Server, Socket } from 'socket.io';

import { ConnectionService, UserService, MessageService } from '../services';
import { UserEntity } from '../entities';

interface IStartingChatParams {
  email: string;
  message: string;
}

interface ISendClientMessage {
  text: string;
  adminSocketId: string;
}

class ClientWS {
  private socket: Socket | null = null;
  private user: UserEntity | null = null;

  private emitAllMessages = async () => {
    const allMessages = await MessageService.getByUser(this.user.id);

    this.socket.emit('client_all_messages', allMessages);
  };

  private startChat = async ({ email, message }: IStartingChatParams) => {
    let user = await UserService.findOrCreate({ email });

    this.user = user;

    await ConnectionService.findOrCreate({
      user_id: user.id,
      socket_id: this.socket.id,
    });

    await MessageService.create({ text: message, user_id: user.id });

    await this.emitAllMessages();
  };

  private sendClientMessage = async ({ text }: ISendClientMessage) => {
    await MessageService.create({
      text,
      user_id: this.user.id,
    });

    await this.emitAllMessages();
  };

  public listen = (io: Server) => {
    io.on('connect', (socket) => {
      this.socket = socket;

      socket.on('start_chat', this.startChat);
      socket.on('send_client_message', this.sendClientMessage);
    });
  };
}

export default new ClientWS();
