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
      path: "/order",
      meta: {
        title: "我的订单",
        needLogin: true
      },
      component: () => import("@/views/order/index")
    },
    {
      path: "/cart",
      meta: {
        title: "购物车"
      },
      component: () => import("@/views/cart/index")
    },
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      meta: {
        title: "登陆"
      }
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
      path: "/my",
      component: () => import("@/views/my"),
      redirect: "/my/center",
      children: [
        {
          path: "center",
          meta: {
            title: "个人中心"
          },
          component: () => import("@/views/my/center")
        },
        {
          path: "set",
          meta: {
            title: "设置"
          },
          component: () => import("@/views/my/set")
        }
      ]
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