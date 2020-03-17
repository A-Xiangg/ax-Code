import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/index",
      component: () => import("@/views/index/index"),
      meta: {
        title: "首页",
        // 缓存首页
        keepAlive: true
      }
    },
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      meta: {
        title: "登录",
        // 缓存首页
        keepAlive: true
      }
    },
    {
      path: "/submit",
      meta: {
        title: "我的提交"
      },
      component: () => import("@/views/submit/submit")
    },
    {
      path: "/matter",
      meta: {
        title: "记一笔"
      },
      component: () => import("@/views/add/matter")
    },
    {
      path: "/Review",
      meta: {
        title: "审核"
      },
      component: () => import("@/views/Approval/Review")
    },
    {
      path: "/my",
      component: () => import("@/views/my/index"),
      redirect: "/my/center",
      children: [
        {
          path: "center",
          meta: {
            title: "个人中心"
          },
          component: () => import("@/views/my/children/center")
        },
        {
          path: "client",
          meta: {
            title: "客户管理"
          },
          component: () => import("@/views/my/client/client")
        },
        {
          path: "authority",
          meta: {
            title: "权限管理"
          },
          component: () => import("@/views/my/authority/index")
        },
        {
          path: "staff",
          meta: {
            title: "职员管理"
          },
          component: () => import("@/views/my/staff/staff")
        },
        {
          path: "set",
          meta: {
            title: "设置"
          },
          component: () => import("@/views/my/children/set")
        }
      ]
    },
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      meta: {
        title: "登陆"
      }
    },
    {
      path: "*",
      component: () => import("@/components/NotFound")
    }
  ]
});

router.beforeEach((to, from, next) => {
  let { title, needLogin } = to.meta;
  let { isLogin } = store.state;
  document.title = title;

  if (needLogin && !isLogin) {
    next({
      path: "/login"
    });
  } else {
    next();
  }
});

export default router;
