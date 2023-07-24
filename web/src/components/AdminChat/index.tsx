import './styles.css';

import { Ref, defineComponent, ref } from 'vue';

interface IAdminChatProps {
  email: Ref<string>;
  isOpen: Ref<boolean>;
  messages: Ref<Message[]>;
  onMessageSubmit: (message: string) => void;
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
  user: User | null;
}

import { Bubble, Header, Submitter } from '@/components';

import { onChangeText } from '@/utils';

const AdminChat = defineComponent({
  props: {
    isOpen: {
      type: Object as () => Ref<boolean>,
      required: true,
    },

    messages: {
      type: Object as () => Ref<Message[]>,
      required: true,
    },

    onMessageSubmit: {
      // @ts-ignore
      type: Function as () => (message: string) => void,
      required: true,
    },

    email: {
      type: Object as () => Ref<string>,
      required: true,
    },
  },

  setup({ isOpen, messages, onMessageSubmit, email }: IAdminChatProps) {
    const message = ref<string>('');

    const onClose = () => {
      isOpen.value = false;
    };

    const onSubmit = () => {
      onMessageSubmit(message.value);
      message.value = '';
    };

    return () => (
      <div
        class={`${isOpen.value ? 'chat-container should-appear' : 'chat-container'}`}
      >
        <Header onClose={onClose} title={email.value} />

        <div class="chat-content">
          <div class="chat-messages">
            {messages.value?.map((msg) => (
              <Bubble
                message={msg.text}
                timestamp={msg.created_at}
                isMessageByCurrentUser={msg.admin_id !== null}
              />
            ))}
          </div>
        </div>

        <Submitter
          onSubmit={onSubmit}
          onInput={(e: Event) => onChangeText(e, message)}
          placeholder="Type your answer, adm!"
          value={message.value}
        />
      </div>
    );
  },
});

export { AdminChat };
