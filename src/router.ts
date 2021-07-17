import goTo from 'vuetify/es5/services/goto'
import index from './views/dashboard/Index.vue'

import Router from 'vue-router'
import TemplateEditor from './views/dashboard/pages/TemplateEditor.vue'

import Vue from 'vue'

import SmartcardDocuments from './views/dashboard/pages/documents/SmartcardDocuments.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
      path: '/',
      // @ts-ignore
      component: () => import('@/layouts/full-layout/Layout'),

      children: [
        {
          path: '/',
          name: 'smartcard',
          // @ts-ignore
          component: SmartcardDocuments,
        },
        {
          name: 'Editor',
          path: 'facturadorbeta',
          // @ts-ignore
          component: TemplateEditor,
        },

      ],
    },

    {
      path: '/fe',
      // @ts-ignore
      component: index,

      children: [
        {
          name: 'Editor',
          path: 'editor',
          // @ts-ignore
          component: TemplateEditor,
        },
      ],
    },
  ],
})
