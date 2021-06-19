import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import DocumentList from "./DocumentList.vue";
import { DocumentListItem } from "./DocumentListItem";

const listItems: DocumentListItem[] = [
  {
    folder: [
      {
        contentType: "text/html",
      },
    ],
  },
  {
    folder: {
      contentType: "application/json",
    },
  },
];

describe("DocumentList.vue", () => {
  it("should match snapshot", () => {
    const component = shallowMount(DocumentList, {
      localVue: createLocalVue(),
      vuetify: new Vuetify(),
      propsData: {
        items: listItems,
      },
    });
    expect(component).toMatchSnapshot();
  });
});
