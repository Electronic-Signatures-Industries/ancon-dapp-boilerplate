const CLIENT_API = 'HTTP://127.0.0.1:8545'; 
const WEB_API = 'https://xdvmessaging.auth2factor.com/api/';
const BLOCKNATIVE_API_KEY = "b039615a-2179-4200-9613-4696907dca57";
const DAI_ADDRESS = '0x00FBe0ce907a1ff5EF386F4e0368697aF5885bDA';
const XDV_NFT_ADDRESS = '0xb0c578D19f6E7dD455798b76CC92FfdDb61aD635';
// IMQTCYJCRP3UT4V3T3AJR76X6IG6J2K4XG

export const ConfigPlugin: any = {};
ConfigPlugin.install = function(Vue, options) {
  Vue.appconfig = {
    WEB_API,
    CLIENT_API,
    BLOCKNATIVE_API_KEY
  };
};
