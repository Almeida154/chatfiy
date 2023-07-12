import { defineComponent, onMounted, ref } from 'vue';
import { io } from 'socket.io-client';

import './styles.css';

import { Logo } from '@/components';

const Home = defineComponent({
  setup() {
    const socketIO = ref();

    onMounted(async () => {
      socketIO.value = io('ws://127.0.0.1:3333');
    });

    return () => (
      <div class="container">
        <div class="logo">
          <Logo primaryColor="#2F2F2F" secondColor="#262626" size={440} />
        </div>

        <div class="grain"></div>
      </div>
    );
  },
});

export { Home };
