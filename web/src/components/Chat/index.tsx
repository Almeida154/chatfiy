import './styles.css';

import { Ref, defineComponent, onMounted, ref } from 'vue';

import { Socket, io } from 'socket.io-client';

interface IChatProps {
  isOpen: Ref<boolean>;
}

interface User {
  id: string;
  email: string;
}

interface Message {
  admin_id: string;
  created_at: Date;
  updated_at: Date;
  id: string;
  text: string;
  user: User;
}

import { CHAT_STEPS } from '@/utils/constants';
import { Input } from '@/components';

import { Bubble, Header, Submitter } from './components';

import { onChangeText } from '@/utils';

const Chat = defineComponent({
  props: {
    isOpen: { type: Object as () => Ref<boolean>, required: true },
  },

  setup({ isOpen }: IChatProps) {
    const socketIO = ref<Socket | null>(null);
    const currentStep = ref(CHAT_STEPS.STARTING);

    const message = ref<string>('aaa');
    const email = ref<string>('davod@gmail');

    const messages = ref<Message[]>([]);

    onMounted(() => {
      socketIO.value = io('ws://127.0.0.1:3333');
      getAllMessages();
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
        messages.value = msgs;
      });
    };

    const sendMessage = () => {
      if (message.value === '') return;

      socketIO.value?.emit('send_client_message', {
        text: message.value,
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

export { Chat };
