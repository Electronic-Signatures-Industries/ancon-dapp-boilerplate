import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Vuetify from "vuetify";
import { DocumentMetadata } from "@/views/dashboard/pages/wallet/IPFSManager";
import ShareQRDialog from "./ShareQRDialog.vue";

const documentMetadata: DocumentMetadata = {
  name: "Mocked Document Name",
  contentType: "application/json",
  timestamp: 1000,
  contentRef: "Mock-Content-Ref",
};

const mockDID = {
  id: "did:mock:1",
};

describe("ShareQRDialog.vue", () => {
  let component: Wrapper<ShareQRDialog>;

  beforeEach(async () => {
    const localVue = createLocalVue();

    component = shallowMount(ShareQRDialog, {
      localVue,
      vuetify: new Vuetify(),
    });
  });

  describe("Empty Component", () => {
    it("should match snapshot", async () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe("Component with data", () => {
    beforeEach(async () => {
      component.setProps({
        show: true,
        documentMetadata,
        did: mockDID,
      });

      await component.vm.$nextTick();
    });

    it("should match snapshot when data is provided", async () => {
      expect(component).toMatchSnapshot();
    });
  });
});
