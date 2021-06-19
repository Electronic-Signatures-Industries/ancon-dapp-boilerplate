import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import TransactionStatusDialog from "./TransactionStatusDialog.vue";

describe("TransactionStatusDialog.vue", () => {
  const resultMock = jest.fn<void, []>();
  let wrapperComponent: Wrapper<Vue>;
  let component: Wrapper<TransactionStatusDialog>;

  beforeEach(async () => {
    const localVue = createLocalVue();

    const App = localVue.component("App", {
      components: { TransactionStatusDialog },
      data() {
        return { show: true };
      },
      methods: {
        result: resultMock,
      },
      template: `
        <v-app>
          <transaction-status-dialog
            id="dialog"
            :show.sync="show"
            :transactionStatus="\'Lorem Ipsum\'"
            @confirm="result"
          />
        </v-app>
      `,
    });

    wrapperComponent = mount(App, {
      localVue,
      vuetify: new Vuetify(),
      attachToDocument: true,
    });

    component = wrapperComponent.find("#dialog");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should match snapshot", () => {
    expect(wrapperComponent).toMatchSnapshot();
  });

  it("should send the 'confirm' event when the OK button is pressed", async () => {
    const button = component.find("[data-cy=confirm]");
    button.trigger("click");
    expect(resultMock).toHaveBeenCalledTimes(1);
  });
});
