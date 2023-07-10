import { defineComponent, ref } from 'vue';

const App = defineComponent({
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    return () => (
      <div class="container">
        <p>{count.value}</p>
        <button onClick={increment}>Increment</button>
      </div>
    );
  },
});

export default App;
