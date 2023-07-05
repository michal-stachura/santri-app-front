import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          loginRequired: true
        }
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('src/pages/PageSettings.vue'),
        meta: {
          loginRequired: true
        }
      },
      {
        path: '/auth',
        name: 'Auth',
        component: () => import('pages/PageAuth.vue'),
        meta: {
          loginRequired: false
        }
      },
      {
        path: '/babel-me',
        name: 'BabelMe',
        component: () => import('src/pages/BabelMe.vue'),
        meta: {
          loginRequired: false
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
