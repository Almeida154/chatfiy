import { defineComponent, onMounted, ref } from 'vue';
import { io } from 'socket.io-client';

import './styles.css';

import { Logo, Button } from '@/components';

const Home = defineComponent({
  setup() {
    const socketIO = ref();

    onMounted(async () => {
      socketIO.value = io('ws://127.0.0.1:3333');
    });

    const onFABPress = () => {
      console.log('onFABPress');
    };

    return () => (
      <div class="container">
        <div class="grain"></div>

        <Logo primaryColor="#2F2F2F" secondColor="#262626" size={440} />

        <div class="fab">
          <Button text="I need help" onPress={onFABPress} />
        </div>
      </div>
    );
  },
});

export { Home };
