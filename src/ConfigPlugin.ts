const CLIENT_API = 'http://localhost:8089/'; 
const WEB_API = 'https://xdvmessaging.auth2factor.com/api/';
const BLOCKNATIVE_API_KEY = "b039615a-2179-4200-9613-4696907dca57";
// IMQTCYJCRP3UT4V3T3AJR76X6IG6J2K4XG

export const ConfigPlugin: any = {};
ConfigPlugin.install = function(Vue, options) {
  Vue.appconfig = {
    WEB_API,
    CLIENT_API,
    BLOCKNATIVE_API_KEY
  };
};
