import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';  // pastikan router diimpor

const app = createApp(App);

app.use(createPinia());
app.use(router);  // pastikan router digunakan di sini

app.mount('#app');
