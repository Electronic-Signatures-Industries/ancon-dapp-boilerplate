// @ts-ignore
// @ts-nocheck
import Vue from "vue";
import Router from "vue-router";
import DurableWebsite from "./views/dashboard/pages/dapp/DurableWebsite.vue";
import TemplateEditor from "./views/dashboard/pages/TemplateEditor.vue";
import WorkflowEditor from "./views/dashboard/pages/WorkflowEditor.vue";
import index from "./views/dashboard/Index.vue";
import WalletComponent from "./views/dashboard/pages/Wallet.vue";
import MessagingComponent from "./views/dashboard/pages/Messaging.vue";
import DriveComponent from "./views/dashboard/pages/Drive.vue";


Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      // @ts-ignore
      component: index,
      children: [
        {
          name: "Sitios Web Durables",
          path: "durable_website",
          // @ts-ignore
          component: DurableWebsite
        },
      ]
    },
    {
      path: "/xdv",
      // @ts-ignore
      component: index,

      children: [

        {
          path: "drive",
          name: "drive",
          // @ts-ignore
          component: DriveComponent
        },
        {
          path: "messaging",
          name: "messaging",
          // @ts-ignore
          component: MessagingComponent
        },
        {
          path: "wallet",
          name: "wallet",
          // @ts-ignore
          component: WalletComponent
        },
      ]
    },

    {
      path: "/fe",
      // @ts-ignore
      component: index,

      children: [

        {
          name: "MDV Workflow Editor",
          path: "workflow",
          // @ts-ignore
          component: WorkflowEditor
        },
        {
          name: "Editor",
          path: "editor",
          // @ts-ignore
          component: TemplateEditor
        },
      ]
    }
  ]
});
