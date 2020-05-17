// @ts-ignore
// @ts-nocheck
import Vue from "vue";
import Router from "vue-router";
import DurableWebsite from "./views/dashboard/pages/dapp/DurableWebsite.vue";
import SolModelEditor from "./views/dashboard/pages/SolModelEditor.vue";
import TemplateDeployment from "./views/dashboard/pages/TemplateDeployment.vue";
import WorkflowEditor from "./views/dashboard/pages/WorkflowEditor.vue";
import Admin from "./views/dashboard/pages/Admin.vue";
import index from "./views/dashboard/Index.vue";
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
      path: "/wf",
      // @ts-ignore
      component: index,
      children: [
        {
          name: "Solidity Model",
          path: "solmodel",
          // @ts-ignore
          component: SolModelEditor
        },
        {
          name: "MDV Workflow Editor",
          path: "workflow",
          // @ts-ignore
          component: WorkflowEditor
        },
        {
          name: "Template Deployment",
          path: "deployment",
          // @ts-ignore
          component: TemplateDeployment
        },
        {
          name: "Admin",
          path: "admin",
          // @ts-ignore
          component: Admin,
        },
      ]
    }
  ]
});
