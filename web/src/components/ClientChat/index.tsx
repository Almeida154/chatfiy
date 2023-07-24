import './styles.css';

import { Ref, defineComponent, onMounted, ref } from 'vue';

import { Socket, io } from 'socket.io-client';

interface IClientChatProps {
  isOpen: Ref<boolean>;
}

interface User {
  id: string;
  email: string;
}

interface Message {
  admin_id: string | null;
  created_at: Date;
  updated_at: Date;
  id: string;
  text: string;
  user: User | null;
}

import { CHAT_STEPS } from '@/utils/constants';
import { Input, Bubble, Header, Submitter } from '@/components';

import { onChangeText } from '@/utils';

const ClientChat = defineComponent({
  props: {
    isOpen: { type: Object as () => Ref<boolean>, required: true },
  },

  setup({ isOpen }: IClientChatProps) {
    const socketIO = ref<Socket | null>(null);
    const currentStep = ref(CHAT_STEPS.STARTING);

    const message = ref<string>('');
    const email = ref<string>('');

    const adminSocketId = ref<string>('');

    const messages = ref<Message[]>([]);

    onMounted(() => {
      socketIO.value = io('ws://127.0.0.1:3333');
      getAllMessages();
      getAdminMessage();
    });

    const onClose = () => {
      isOpen.value = false;

      setTimeout(() => {
        currentStep.value = CHAT_STEPS.STARTING;
      }, 500);
    };

    const generateHeaderTitle = () =>
      currentStep.value === CHAT_STEPS.STARTING
        ? 'Starting a conversation'
        : 'In attendance';

    const generateSubmitterPlaceholder = () =>
      currentStep.value === CHAT_STEPS.STARTING
        ? 'How can we help you?'
        : 'Type your message';

    const startChat = () => {
      if (email.value === '' || message.value === '') return;

      socketIO.value?.emit('start_chat', {
        email: email.value,
        message: message.value,
      });

      currentStep.value = CHAT_STEPS.CONVERSATION;
      message.value = '';
    };

    const getAllMessages = () => {
      socketIO.value?.on('client_all_messages', (msgs) => {
        console.log(msgs);
        messages.value = msgs;
      });
    };

    const getAdminMessage = () => {
      socketIO.value?.on('admin_message_sent', ({ msg, socketId }) => {
        messages.value.push(msg);
        adminSocketId.value = socketId;
      });
    };

    const sendMessage = () => {
      if (message.value === '') return;

      socketIO.value?.emit('send_client_message', {
        text: message.value,
        adminSocketId: adminSocketId.value,
      });

      messages.value.push({
        admin_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        id: String(Math.random()),
        text: message.value,
        user: null,
      });

      message.value = '';
    };

    const onMessageSubmit = () => {
      if (currentStep.value === CHAT_STEPS.STARTING) {
        startChat();
        return;
      }

      sendMessage();
    };

    return () => (
      <div
        class={`${isOpen.value ? 'chat-container should-appear' : 'chat-container'}`}
      >
        <div>
          <Header onClose={onClose} title={generateHeaderTitle()} />

          {currentStep.value === CHAT_STEPS.STARTING && (
            <>
              <p class="warning-message">
                Do not post any sensitive data in this chat window.{' '}
                <a
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link"
                >
                  Learn about it
                </a>
              </p>

              <Input
                label="Email"
                onInput={(e: Event) => onChangeText(e, email)}
                placeholder="Your e-mail here"
                value={email.value}
              />
            </>
          )}
        </div>

        {currentStep.value === CHAT_STEPS.CONVERSATION && (
          <div class="chat-content">
            <div class="chat-messages">
              {messages.value?.map((message) => (
                <Bubble
                  message={message.text}
                  timestamp={message.created_at}
                  isMessageByCurrentUser={message.admin_id === null}
                />
              ))}
            </div>
          </div>
        )}

        <Submitter
          onSubmit={onMessageSubmit}
          onInput={(e: Event) => onChangeText(e, message)}
          placeholder={generateSubmitterPlaceholder()}
          value={message.value}
        />
      </div>
    );
  },
});

export { ClientChat };
