import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import jsCookie from 'js-cookie'
import store from '@/store'
import * as storeTypes from '@/store/types'

const allAuth = ['super']

export const constantRoutes: Array<RouteRecordRaw> = [
    // 参考：https://next.router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1
    // 如果路由不存在，$route.params.pathMatch 返回一个数组，包含想要进入的路由url（值等于url.split('/')，如 `/userLabel/23` 返回 ["userLabel", "23"]）。否则得到 undefined
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
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import( '@/views/PageNotFound.vue') },
]

export const asyncRoutes = [
  {
    path: 'user',
    name: 'user',
    meta: {
      title: '用户',
      roles: allAuth
    },
    component: () => import( '@/views/user/User.vue')
  },
  {
    path: 'userLabel',
    name: 'userLabel',
    meta: {
      title: '用户标签',
      roles: allAuth
    },
    component: () => import( '@/views/userLabel/UserLabel.vue')
  },
  {
    path: 'shop',
    name: 'shop',
    meta: {
      title: '店铺管理',
      roles: allAuth
    },
    component: () => import( '@/views/shop/List.vue')
  },
  {
    path: 'shopCategory',
    name: 'shopCategory',
    meta: {
      title: '店铺分类',
      roles: allAuth
    },
    component: () => import( '@/views/shopCategory/List.vue')
  },
  {
    path: 'admin',
    name: 'admin',
    meta: {
      title: '个人信息',
      roles: allAuth
    },
    component: () => import( '@/views/admin/Admin.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// 添加用户的授权路由
async function initAsyncRoutes(){
  return new Promise((resolve, reject) => {
    try{
      // 获取用户信息，获取对应权限
      store.dispatch(storeTypes.UPDATE_ADMIN).then(r => {
        const { roles } = r
        const currentRoutes = router.getRoutes()
        currentRoutes.forEach(route => {
          if(route.meta.roles) router.removeRoute(route.name as string) // 先清空上一次已添加的授权路由
        })
        // 根据用户权限动态添加对应授权的路由
        store.dispatch(`permission/${storeTypes.GENERATE_ROUTES}`, roles).then( (routes: Array<any>) => {
          console.log('新的授权路由', routes)
          routes.forEach( route => {
            router.addRoute('Home',route)
          })
          resolve(true)
        })
      })
    }catch(e){
      reject(false)
    }
  })
}

router.beforeEach( (to, from) => {
  return new Promise((resolve, reject) => {
    const sid = jsCookie.get('SID')
    // console.log('beforeEach', to)
    if(!sid && to.meta.roles){
      // 需要权限，但是未登录
      resolve('/login')
    }else{
      // console.log('beforeEach', store.state.admin)
      if(!store.state.admin){
        initAsyncRoutes().then(res => {
          console.log('允许的路由', router.getRoutes())
          resolve(to.path) // 直接使用 resolve() 会进空白页，不会进404
        }).catch(e => {
          console.log(e)
          reject()
        })
      }else{
        resolve()
      }
    }
  })
})

router.onError((e) => {
  console.log('---------------------', e)
})

export default router
