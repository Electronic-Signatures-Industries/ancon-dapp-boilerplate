import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import VueFormJsonSchema from 'vue-form-json-schema';
import VueMermaid from 'vue-mermaid';
import Vuethereum from 'vuethereum';
import vuetify from './plugins/vuetify';
import VueWorker from 'vue-worker';
import { initMiddleware, initXdvMiddleware, MiddlewareOptions } from './libs';
import './plugins/base';
import './plugins/chartist';
import './plugins/vee-validate';
import './plugins/appconfig';
// @ts-nocheck
// @ts-ignore


Vue.component('vue-form-json-schema', VueFormJsonSchema);
Vue.use(VueMermaid);
Vue.use(Vuethereum);
Vue.use(VueWorker)
Vue.config.productionTip = true;

Vue.prototype.$loadOnchainDependencies = function(options: MiddlewareOptions) {
  return initMiddleware(options);
};

Vue.prototype.$loadXdvDependencies = function(options: MiddlewareOptions) {
  return initXdvMiddleware(options);
};

// @ts-ignore
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
