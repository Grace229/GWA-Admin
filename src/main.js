import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import '@/assets/css/index.scss';
import './tailwind.css';
import '@/assets/css/main.scss';
import formatCurrency from '@/util/formatCurrency';
import SpinnerLoader from '@/components/reusable/SpinnerLoader.vue';
// import '/src/assets/css/bootstrap.min.css'
import GetStartedBtn from '@/components/reusable/GetStartedBtn.vue';
// import { handleBackButton } from './router/NavigationGuard';
// import VueTelInput from 'vue-tel-input'
// import VuePhoneNumberInput from 'vue-phone-number-input'
// import 'vue-phone-number-input/dist/vue-phone-number-input.css'

// Vuetify
// import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});

createApp(App)
    .use(router)
    .use(VCalendar, {})
    .component('SpinnerLoader', SpinnerLoader)
    .component('GetStartedBtn', GetStartedBtn)
    .provide('formatCurrency', formatCurrency)
    .use(vuetify)
    .use(store)
    .mount('#app');

  router.beforeEach((to, from, next) => {
    const token = !!store.getters['authToken/apiToken'];
   
    if (!token && to.matched.some(record => record.meta.requiresAuth)) {  
      localStorage.removeItem('vuex');
      return next('/login');
    }
   
    next();
  });

// .use(VueTelInput).component('vue-phone-number-input', VuePhoneNumberInput)
