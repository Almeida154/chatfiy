import './reset.css';

// @ts-expect-error i don't know
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { createRouter, createWebHistory } from 'vue-router';
import * as HeroIcons from 'oh-vue-icons/icons/hi';

import { Home, Admin } from './pages';

addIcons(...Object.values({ ...HeroIcons }));

const routes = [
  { path: '/', component: Home },
  { path: '/admin', component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({});

app.use(router);
app.component('v-icon', OhVueIcon);
app.mount('#app');
