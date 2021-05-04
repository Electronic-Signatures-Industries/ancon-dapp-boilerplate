import Vuetify from "vuetify";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import WalletDetails from "./WalletDetails.vue";

describe("WalletDetails.vue", () => {
  let component: Wrapper<WalletDetails>;

  beforeEach(() => {
    component = shallowMount(WalletDetails, {
      localVue: createLocalVue(),
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
