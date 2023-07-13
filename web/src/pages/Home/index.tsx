import { defineComponent, ref } from 'vue';

import './styles.css';

import { Logo, Button, Chat } from '@/components';

const Home = defineComponent({
  setup() {
    const isChatOpen = ref(false);

    const onChatOpen = () => (isChatOpen.value = true);

    return () => (
      <div class="container">
        <div class="grain"></div>

        <Logo primaryColor="#2F2F2F" secondaryColor="#262626" size={440} />

        <div class={!isChatOpen.value ? 'fab should-appear' : 'fab'}>
          <Button text="I need help" icon="hi-chat-alt-2" onPress={onChatOpen} />
        </div>

        <Chat isOpen={isChatOpen} />
      </div>
    );
  },
});

export { Home };
