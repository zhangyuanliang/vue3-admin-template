import { createRouter, createWebHistory } from 'vue-router';
const Layout = () => import("@/layout/index.vue")

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/workbench",
    children: [
      {
        path: "workbench",
        component: () => import("@/views/workbench/index.vue"),
        name: "Workbench",
        meta: {
          title: "工作台",
          svgIcon: "workbench",
          affix: true
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    name: "System",
    meta: {
      title: "系统管理",
      svgIcon: "setting"
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/system/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          svgIcon: ""
        }
      },
      {
        path: "organization",
        component: () => import("@/views/system/organization/index.vue"),
        name: "Organization",
        meta: {
          title: "组织管理",
          svgIcon: ""
        }
      },
      {
        path: "log",
        component: () => import("@/views/system/log/index.vue"),
        name: "Log",
        meta: {
          title: "日志管理",
          svgIcon: ""
        }
      },
    ]
  },
];

export const asyncRoutes = []

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
});

export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router;
