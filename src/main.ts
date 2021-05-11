import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import VueSkycons from 'vue-skycons';
import vuetify from './plugins/vuetify';
import VueWorker from 'vue-worker';
import './plugins/base';
import './plugins/chartist';
import './plugins/vee-validate';
import './plugins/appconfig';
import Vuebar from 'vuebar';

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '779014570531-bvmnb5bq69uov2cc1vkr4jhh03pgdrvj.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
// @ts-nocheck
// @ts-ignore
Vue.use(VueSkycons, {
    color: '#1e88e5'
});

Vue.use(Vuebar);
Vue.use(VueWorker)
Vue.config.productionTip = true;



// @ts-ignore
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
