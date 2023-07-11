import { defineComponent, onMounted, ref } from 'vue';
import { io } from 'socket.io-client';

const App = defineComponent({
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    onMounted(async () => {
      const socket = io('ws://127.0.0.1:3333');
      console.log(socket);
    });

    return () => (
      <div class="container">
        <p>{count.value}</p>
        <button onClick={increment}>Increment</button>
      </div>
    );
  },
});

export default App;
