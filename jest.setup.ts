import Vue from "vue";
import Vuetify from "vuetify";
import moment from "moment-timezone";

// Vuetify Fix: https://github.com/vuetifyjs/vuetify/discussions/4068#discussioncomment-24984
Vue.use(Vuetify);

// MomentJS Fix
moment.tz.setDefault("UTC");
