import DocumentDetails from './views/dashboard/pages/documents/DocumentDetails.vue';
import DriveComponent from './views/dashboard/pages/documents/Drive.vue';
import DurableWebsite from './views/dashboard/pages/dapp/DurableWebsite.vue';
import goTo from 'vuetify/es5/services/goto';
import index from './views/dashboard/Index.vue';
import MessagingComponent from './views/dashboard/pages/messaging/Messaging.vue';
import Router from 'vue-router';
import TemplateEditor from './views/dashboard/pages/TemplateEditor.vue';
import ViewerComponent from './views/dashboard/pages/documents/Viewer.vue';
import Vue from 'vue';
import WalletComponent from './views/dashboard/pages/wallet/Wallet.vue';
import CertificatesComponent from './views/dashboard/pages/certs/Certificates.vue';
import TokensComponent from './views/dashboard/pages/tokens/Tokens.vue';
import SmartcardDocuments from './views/dashboard/pages/documents/SmartcardDocuments.vue';

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
        scrollTo = to.hash
    } else if (savedPosition) {
        scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
},
  routes: [
    {
      path: "/",
      // @ts-ignore
      component: () => import('@/layouts/full-layout/Layout'),

      children: [
        {
          path: "/",
          name: "smartcard",
          // @ts-ignore
          component: SmartcardDocuments,
        },
        {
          path: "certs",
          name: "certs",
          // @ts-ignore
          component: CertificatesComponent,
        },
        {
          path: "drive",
          name: "drive",
          // @ts-ignore
          component: DriveComponent,
        },
        {
          path: "/user/:user/details/:id",
          name: "details",
          // @ts-ignore
          component: DocumentDetails,
        },
        // {
        //   path: "messaging",
        //   name: "messaging",
        //   // @ts-ignore
        //   component: MessagingComponent
        // },
        {
          path: "wallet",
          name: "wallet",
          // @ts-ignore
          component: WalletComponent
        },
        {
          path: "tokens",
          name: "tokens",
          // @ts-ignore
          component: TokensComponent
        },
        {
          path: "viewer",
          name: "viewer",
          // @ts-ignore
          component: ViewerComponent,
        },
      ]
    },

    {
      path: "/fe",
      // @ts-ignore
      component: index,

      children: [


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
