import './styles.css';

import { defineComponent } from 'vue';

// import { Logo, Button, Chat } from '@/components';

const Admin = defineComponent({
  setup() {
    return () => (
      <div class="admin-container">
        <div class="admin-grain"></div>
      </div>
    );
  },
});

export { Admin };
