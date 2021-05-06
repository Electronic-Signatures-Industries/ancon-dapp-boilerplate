import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import UploadDialog from "./UploadDialog.vue";

describe("UploadDialog.vue", () => {
  const sentMock = jest.fn<void, [File]>();
  let wrapperComponent: Wrapper<Vue>;
  let component: Wrapper<UploadDialog>;

  beforeEach(() => {
    const localVue = createLocalVue();

    // to render vuetify dialog, vuetify requires the v-app component
    // so we pack our component into a "bridge" component
    const App = localVue.component("App", {
      components: { UploadDialog },
      data() {
        return { show: true };
      },
      methods: {
        result: sentMock,
      },
      template: `
        <v-app>
          <upload-dialog
            id="dialog"
            :loading="false"
            :show.sync="show"
            :uploadStatus="null"
            @result="result"
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
    expect(component).toMatchSnapshot();
  });

  it("should hide when the 'Cancel' button is pressed", async () => {
    const button = component.find("[data-cy=cancel-button]");
    button.trigger("click");
    expect(wrapperComponent.vm.$data["show"]).toBeFalsy();
  });

  it("should sent the data when 'Confirm' button is pressed", async () => {
    const mockFile = new File(["Lorem Ipsum"], "test.txt");
    component.setData({ files: mockFile });
    const button = component.find("[data-cy=ok-button]");
    button.trigger("click");

    expect(sentMock).toBeCalledTimes(1);
    const sentFile = sentMock.mock.calls[sentMock.mock.calls.length - 1][0];
    expect(sentFile).toEqual(mockFile);
  });
});
