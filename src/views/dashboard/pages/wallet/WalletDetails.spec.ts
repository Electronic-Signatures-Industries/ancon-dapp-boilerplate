import Vuetify from "vuetify";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import WalletDetails from "./WalletDetails.vue";
import Web3 from "web3";

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

  it("should match snapshot", async () => {
    expect(component).toMatchSnapshot();
  });

  it("should query correctly the Token Balance", async () => {
    // Mock the contract
    const balanceCall = jest.fn().mockResolvedValue(Web3.utils.toWei("20"));
    const nameCall = jest.fn().mockResolvedValue("Mock Coin");
    const mockContract = {
      methods: {
        balanceOf: jest.fn().mockReturnValue({ call: balanceCall }),
        name: jest.fn().mockReturnValue({ call: nameCall }),
      },
    };

    component.setProps({ erc20Contract: mockContract });
    await component.vm.$nextTick();
    await component.vm.$nextTick();
    await component.vm.$nextTick();

    expect(component.vm.$data.balance).toEqual("20");
    expect(component.vm.$data.currencyName).toEqual("Mock Coin");
  });
});
