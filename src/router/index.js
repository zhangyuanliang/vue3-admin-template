import { createRouter, createWebHashHistory } from 'vue-router';
// import Layout from '@/layout';

export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect'),
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    hidden: true,
  },
];

export const asyncRoutes = []

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
});

export default router;
