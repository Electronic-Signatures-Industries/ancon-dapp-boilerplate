const API_URL = "http://localhost:8081/api/";
const PDF_API_URL = "http://localhost:8081/api/pdf";
const BLOCKNATIVE_API_KEY = "b039615a-2179-4200-9613-4696907dca57";
// IMQTCYJCRP3UT4V3T3AJR76X6IG6J2K4XG

export const ConfigPlugin: any = {};
ConfigPlugin.install = function(Vue, options) {
  Vue.appconfig = {
    API_URL,
    PDF_API_URL,
    BLOCKNATIVE_API_KEY
  };
};
