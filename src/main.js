// themewagon.com
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


import router from './router';

import './axios';
import store from './vuex';
import utilsMixin from './utils';

// Layout base do sistema
import BaseLayout from './components/base/BaseLayout.vue';
import HeaderLayout from './components/base/HeaderLayout.vue';
import MenuLayout from './components/base/MenuLayout.vue';
import TitleHeaderLayout from './components/base/TitleHeaderLayout.vue';
import BoxMensagemSistema from './components/base/BoxMensagemSistema.vue';
import LoadingBar from "./components/loadingBar/LoadingBar.vue";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faUserSecret, faUserSlash, faHouseUser, faUserTie, faUser, faScaleBalanced, faPen, faKey } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faUserSlash, faHouseUser, faUserTie, faUser, faScaleBalanced, faPen, faKey);

const app = createApp(App).use(VueAxios, axios).use(router).use(store).mixin(utilsMixin);

// Componentes base do sistema
app.component('base-layout', BaseLayout);
app.component('header-layout', HeaderLayout);
app.component('menu-layout', MenuLayout);
app.component('title-header-layout', TitleHeaderLayout);
app.component('box-mensagem-sistema', BoxMensagemSistema);
app.component('loading-bar', LoadingBar);
app.component('font-awesome-icon', FontAwesomeIcon);

app.config.globalProperties.nomeSistema = 'Segurança - Login';

app.config.globalProperties.urlUpload = '../assets/images/uploads/'

router.isReady().then(() => {
    app.mount('#app');
});