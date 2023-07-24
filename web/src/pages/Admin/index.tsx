import './styles.css';

import { defineComponent, onMounted, ref } from 'vue';

import { Socket, io } from 'socket.io-client';
import { AdminChat, Connection } from '@/components';

interface User {
  id: string;
  email: string;
}

interface Connection {
  admin_id: string;
  created_at: Date;
  updated_at: Date;
  user: User;
}

interface Message {
  admin_id: string;
  created_at: Date;
  updated_at: Date;
  id: string;
  text: string;
  user: User | null;
}

const Admin = defineComponent({
  setup() {
    const socketIO = ref<Socket | null>(null);
    const clientConnections = ref<Connection[]>([]);
    const currentConnection = ref<Connection | null>(null);
    const currentEmail = ref<string>('');
    const messages = ref<Message[]>([]);

    const isChatOpen = ref(false);

    onMounted(() => {
      socketIO.value = io('ws://127.0.0.1:3333');
      getAllConnections();
      getAllMessages();
      getClientMessage();
    });

    const getAllConnections = () => {
      socketIO.value?.on('admin_connections_list', (connections) => {
        clientConnections.value = connections;
      });
    };

    const getChatMessages = (connection: Connection) => {
      socketIO.value?.emit('admin_get_messages_by_user', {
        userId: connection.user.id,
      });

      currentEmail.value = connection.user.email;
    };

    const onConnectionClick = (connection: Connection) => {
      currentConnection.value = connection;

      if (isChatOpen.value) {
        isChatOpen.value = false;

        setTimeout(() => {
          getChatMessages(connection);
          isChatOpen.value = true;
        }, 500);

        return;
      }

      getChatMessages(connection);
      isChatOpen.value = true;
    };

    const getAllMessages = () => {
      socketIO.value?.on('admin_all_messages_by_user', (msgs) => {
        messages.value = msgs;
      });
    };

    const getClientMessage = () => {
      socketIO.value?.on('client_message_sent', (msg) => {
        messages.value.push(msg);
      });
    };

    const sendMessage = (message: string) => {
      socketIO.value?.emit('send_admin_message', {
        userId: currentConnection.value?.user.id,
        text: message,
      });

      messages.value.push({
        admin_id: 'ADMIN_ID',
        created_at: new Date(),
        updated_at: new Date(),
        id: String(Math.random()),
        text: message,
        user: null,
      });
    };

    return () => (
      <div class="admin-container">
        <div class="admin-grain"></div>

        <div class="admin-connections">
          <h3 class="admin-title">All connections</h3>
          {clientConnections.value?.map((clientConnection) => (
            <Connection
              email={clientConnection.user.email}
              wasAttended={clientConnection.admin_id !== null}
              onClick={() => onConnectionClick(clientConnection)}
            />
          ))}

          <AdminChat
            isOpen={isChatOpen}
            messages={messages}
            onMessageSubmit={sendMessage}
            email={currentEmail}
          />
        </div>
      </div>
    );
  },
});

export { Admin };
