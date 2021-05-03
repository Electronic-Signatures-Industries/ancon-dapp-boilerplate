import Vue from "vue";
import Vuetify from "vuetify";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import WalletDetails from "./WalletDetails.vue";

// Vuetify Fix: https://github.com/vuetifyjs/vuetify/discussions/4068#discussioncomment-24984
Vue.use(Vuetify);
const localVue = createLocalVue();

describe("WalletDetails.vue", () => {
  let component: Wrapper<WalletDetails>;

  beforeEach(() => {
    component = shallowMount(WalletDetails, {
      localVue,
      vuetify: new Vuetify(),
      propsData: {
        didId: "did:test",
        currentAddress: "0x000",
      },
    });
  });

  it("should match snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
