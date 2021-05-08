import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import { DocumentMetadata } from "@/views/dashboard/pages/wallet/IPFSManager";
import EventLog from "./EventLog.vue";

const documentMetadata: DocumentMetadata = {
  name: "Mocked Document Name",
  contentType: "application/json",
  timestamp: 1000,
};

describe("EventLog.vue", () => {
  let component: Wrapper<EventLog>;

  beforeEach(() => {
    component = mount(EventLog, {
      localVue: createLocalVue(),
      vuetify: new Vuetify(),
    });
  });

  describe("snapshots", () => {
    it("should match when document is null", () => {
      expect(component).toMatchSnapshot();
    });

    it("should match when document is defined", async () => {
      component.setProps({ documentMetadata });
      await component.vm.$nextTick();

      expect(component).toMatchSnapshot();
    });
  });

  it("should emit the document metadata when the link is pressed", async () => {
    component.setProps({ documentMetadata });
    await component.vm.$nextTick();

    const button = component.find("[data-cy=download-button]");
    button.trigger("click");

    expect(component.emitted("download")[0][0]).toMatchSnapshot();
  });
});
