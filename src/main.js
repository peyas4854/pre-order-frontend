import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './scss/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router'
import {library}         from "@fortawesome/fontawesome-svg-core";
import {fas}             from '@fortawesome/free-solid-svg-icons'

library.add(fas);
import {fab}             from '@fortawesome/free-brands-svg-icons';

library.add(fab);
import {far}             from '@fortawesome/free-regular-svg-icons';

library.add(far);
import {dom}             from "@fortawesome/fontawesome-svg-core";

dom.watch();
//services
import ApiService      from "@/service/api.service";
import * as JwtService from "@/service/jwt.service";

ApiService.init();


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');
