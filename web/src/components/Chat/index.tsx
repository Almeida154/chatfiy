import { Ref, defineComponent, onMounted, ref } from 'vue';

import { Socket, io } from 'socket.io-client';

interface IChatProps {
  isOpen: Ref<boolean>;
}

import { CHAT_STEPS } from '@/utils/constants';
import { Bubble, Header, Submitter } from './components';
import { Button } from '@/components';

import './styles.css';

const Chat = defineComponent({
  props: {
    isOpen: { type: Object as () => Ref<boolean>, required: true },
  },

  setup({ isOpen }: IChatProps) {
    const socketIO = ref<Socket | null>(null);
    const currentStep = ref(CHAT_STEPS.STARTING);

    onMounted(() => {
      socketIO.value = io('ws://127.0.0.1:3333');
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

    const onStartConversation = () => {
      currentStep.value = CHAT_STEPS.CONVERSATION;
    };

    return () => (
      <div
        class={`${isOpen.value ? 'chat-container should-appear' : 'chat-container'}`}
      >
        <Header onClose={onClose} title={generateHeaderTitle()} />

        {currentStep.value === CHAT_STEPS.STARTING ? (
          <>
            <div class="button-wrapper">
              <Button
                text="Start"
                icon="hi-chat-alt-2"
                style={{ width: 'fit-content' }}
                onPress={onStartConversation}
              />
            </div>
          </>
        ) : (
          <>
            <div class="chat-messages">
              <Bubble />
              <Bubble />
              <Bubble />
            </div>

            <Submitter />
          </>
        )}
      </div>
    );
  },
});

export { Chat };
