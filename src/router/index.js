import { createRouter, createWebHistory } from 'vue-router';
const Layout = () => import("@/layout/index.vue")

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
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
      {
        path: "dictionary",
        component: () => import("@/views/system/dictionary/index.vue"),
        name: "Dictionary",
        meta: {
          title: "字典管理",
          svgIcon: ""
        }
      },
      {
        path: "dictionaryValue",
        component: () => import("@/views/system/dictionary/dictionaryValue.vue"),
        name: "DictionaryValue",
        meta: {
          title: "字典值管理",
          svgIcon: "",
          hidden: true,
          activeMenu: '/system/dictionary'
        }
      },
      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          svgIcon: ""
        }
      },
      {
        path: "roleLink",
        component: () => import("@/views/system/role/roleLink.vue"),
        name: "RoleLink",
        meta: {
          title: "角色链接",
          svgIcon: "",
          hidden: true,
          activeMenu: '/system/role'
        }
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        name: "Menu",
        meta: {
          title: "菜单设置",
          svgIcon: "",
        }
      },
      {
        path: "parameter",
        component: () => import("@/views/system/parameter/index.vue"),
        name: "Parameter",
        meta: {
          title: "参数设置",
          svgIcon: "",
        }
      },

    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
];

export const asyncRoutes = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
