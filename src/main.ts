// @ts-nocheck
// @ts-ignore
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import vuetify from "./plugins/vuetify";
import "./plugins/appconfig";
import VueMermaid from "vue-mermaid";

import Vuethereum from "vuethereum";
import { initMiddleware, MiddlewareOptions, initOffchainMiddleware } from "./libs";

Vue.use(VueMermaid);
Vue.use(Vuethereum);
import VueWorker from 'vue-worker'
Vue.use(VueWorker)
Vue.config.productionTip = true;

Vue.prototype.$loadOnchainDependencies = function(options: MiddlewareOptions) {
  return initMiddleware(options);
};

Vue.prototype.$loadOffchainDependencies = function(options: MiddlewareOptions) {
  return initOffchainMiddleware(options);
};

// @ts-ignore
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
