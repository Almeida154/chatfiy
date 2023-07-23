import './styles.css';

import { Ref, defineComponent, onMounted, ref } from 'vue';

import { Socket, io } from 'socket.io-client';

interface IChatProps {
  isOpen: Ref<boolean>;
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
    const currentStep = ref(CHAT_STEPS.CONVERSATION);

    const message = ref<string>('');
    const email = ref<string>('');

    onMounted(() => {
      // socketIO.value = io('ws://127.0.0.1:3333');
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
      currentStep.value = CHAT_STEPS.CONVERSATION;
    };

    const sendMessage = () => {
      message.value = '';
    };

    const onMessageSubmit = () => {
      if (currentStep.value === CHAT_STEPS.STARTING) {
        startChat();
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
              />
            </>
          )}
        </div>

        {currentStep.value === CHAT_STEPS.CONVERSATION && (
          <div class="chat-content">
            <div class="chat-messages">
              <Bubble
                message="hello"
                timestamp={new Date()}
                isMessageByCurrentUser={true}
              />

              <Bubble
                message="hi!"
                timestamp={new Date()}
                isMessageByCurrentUser={false}
              />

              <Bubble
                message="sup?"
                timestamp={new Date()}
                isMessageByCurrentUser={true}
              />

              <Bubble
                message="i have a problem, bro. can you help me?"
                timestamp={new Date()}
                isMessageByCurrentUser={true}
              />

              <Bubble
                message="yeah, what is up?"
                timestamp={new Date()}
                isMessageByCurrentUser={false}
              />

              <Bubble
                message="we can help you for sure"
                timestamp={new Date()}
                isMessageByCurrentUser={false}
              />

              <Bubble
                message="we can help you for sure"
                timestamp={new Date()}
                isMessageByCurrentUser={false}
              />

              <Bubble
                message="we can help you for sure"
                timestamp={new Date()}
                isMessageByCurrentUser={false}
              />
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
