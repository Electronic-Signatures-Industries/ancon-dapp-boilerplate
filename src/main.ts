import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import VueWorker from 'vue-worker';
import { initMiddleware, initXdvMiddleware, MiddlewareOptions } from './libs';
import './plugins/base';
import './plugins/chartist';
import './plugins/vee-validate';
import './plugins/appconfig';
// @ts-nocheck
// @ts-ignore


Vue.use(VueWorker)
Vue.config.productionTip = true;

// Vue.prototype.$loadOnchainDependencies = function(options: MiddlewareOptions) {
//   return initMiddleware(options);
// };

// @ts-ignore
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
