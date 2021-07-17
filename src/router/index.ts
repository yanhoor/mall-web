import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import jsCookie from 'js-cookie'

const routes: Array<RouteRecordRaw> = [
    // 参考：https://next.router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1
    // 如果路由不存在，$route.params.pathMatch 返回一个数组，包含想要进入的路由url（值等于url.split('/')，如 `/userLabel/23` 返回 ["userLabel", "23"]）。否则得到 undefined
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import( '@/views/PageNotFound.vue') },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import( '@/views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/user',
    meta: {
      title: '首页'
    },
    component: () => import( '@/views/layout/Layout.vue'),
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户'
        },
        component: () => import( '@/views/user/User.vue')
      },
      {
        path: 'userLabel',
        name: 'userLabel',
        meta: {
          title: '用户标签'
        },
        component: () => import( '@/views/userLabel/UserLabel.vue')
      },
      {
        path: 'shopCategory',
        name: 'shopCategory',
        meta: {
          title: '店铺分类'
        },
        component: () => import( '@/views/shopCategory/List.vue')
      },
      {
        path: 'admin',
        name: 'admin',
        meta: {
          title: '个人信息'
        },
        component: () => import( '@/views/admin/Admin.vue')
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const sid = jsCookie.get('SID')
  if(!sid && to.path != '/login'){
    return '/login'
  }else{
    return true
  }
})

router.onError((e) => {
  console.log('---------------------', e)
})

export default router
