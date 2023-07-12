import { createApp } from 'vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import * as HeroIcons from 'oh-vue-icons/icons/hi';

addIcons(...Object.values({ ...HeroIcons }));

import './reset.css';

import App from './App';

createApp(App).component('v-icon', OhVueIcon).mount('#app');
