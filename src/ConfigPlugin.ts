//const CLIENT_API = 'HTTP://127.0.0.1:7545'; 
const CLIENT_API = 'HTTP://127.0.0.1:8545';
const WEB_API = 'https://xdvmessaging.auth2factor.com/api/';
const BLOCKNATIVE_API_KEY = "b039615a-2179-4200-9613-4696907dca57";
const BATCHID = "973cfa273331bb973a8f55e708b7c870406a00e603cc7a67a259f92836b2f354";
const CREATE_POSTAGE_BATCH_ENABLE = false;

// IMQTCYJCRP3UT4V3T3AJR76X6IG6J2K4XG

export const ConfigPlugin: any = {};
ConfigPlugin.install = function(Vue, options) {
  Vue.appconfig = {
    WEB_API,
    CLIENT_API,
    BLOCKNATIVE_API_KEY,
    BATCHID,
    CREATE_POSTAGE_BATCH_ENABLE,
  };
};
