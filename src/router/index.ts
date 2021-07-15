import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import jsCookie from 'js-cookie'

const routes: Array<RouteRecordRaw> = [
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

export default router
