import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
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
      path: "/submit",
      meta: {
        title: "我的提交"
      },
      component: () => import("@/views/submit/index")
    },
    {
      path: "/matter",
      meta: {
        title: "记一笔"
      },
      component: () => import("@/views/add/matter")
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
