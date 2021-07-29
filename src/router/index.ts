import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import jsCookie from 'js-cookie'
import store from '@/store'
import * as storeTypes from '@/store/types'

const allAuth = ['super', 'admin']
const superAuth = ['super']

export const constantRoutes: Array<RouteRecordRaw> = [
    // 参考：https://next.router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1
    // 如果路由不存在，$route.params.pathMatch 返回一个数组，包含想要进入的路由url（值等于url.split('/')，如 `/userLabel/23` 返回 ["userLabel", "23"]）。否则得到 undefined
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import( '@/views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/me',
    meta: {
      title: '首页'
    },
    component: () => import( '@/views/layout/Layout.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import( '@/views/PageNotFound.vue') },
]

export const asyncRoutes = [
  {
    path: 'admin',
    name: 'Admin',
    meta: {
      title: '管理员列表',
      roles: superAuth
    },
    component: () => import( '@/views/admin/List.vue')
  },
  {
    path: 'user',
    name: 'User',
    meta: {
      title: '用户',
      roles: superAuth
    },
    component: () => import( '@/views/user/User.vue')
  },
  {
    path: 'userLabel',
    name: 'UserLabel',
    meta: {
      title: '用户标签',
      roles: superAuth
    },
    component: () => import( '@/views/userLabel/UserLabel.vue')
  },
  {
    path: 'shop',
    name: 'Shop',
    meta: {
      title: '店铺管理',
      roles: superAuth
    },
    component: () => import( '@/views/shop/List.vue')
  },
  {
    path: 'shopDetail',
    name: 'ShopDetail',
    meta: {
      title: '店铺管理',
      roles: allAuth
    },
    component: () => import( '@/views/shop/Detail.vue')
  },
  {
    path: 'shopCategory',
    name: 'ShopCategory',
    meta: {
      title: '店铺分类',
      roles: superAuth
    },
    component: () => import( '@/views/shopCategory/List.vue')
  },
  {
    path: 'goods',
    name: 'Goods',
    meta: {
      title: '商品管理',
      roles: allAuth
    },
    component: () => import( '@/views/goods/List.vue')
  },
  {
    path: 'goodsLabel',
    name: 'GoodsLabel',
    meta: {
      title: '商品标签',
      roles: allAuth
    },
    component: () => import( '@/views/goodsLabel/List.vue')
  },
  {
    path: 'me',
    name: 'Me',
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
export async function initAsyncRoutes(){
  return new Promise<void>((resolve, reject) => {
    try{
      // 获取用户信息，获取对应权限
      const admin = store.state.admin as any
      const roles = admin ? admin.roles : []
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
        resolve()
      })
    }catch(e){
      reject()
    }
  })
}

router.beforeEach( (to, from) => {
  return new Promise((resolve, reject) => {
    const sid = jsCookie.get('SID')
    // console.log('beforeEach', to)
    if(!sid || to.path == '/login'){
      // 需要权限
      if(to.meta.roles) resolve('/login')
      resolve()
    }else{
      // console.log('beforeEach', store.state.admin)
      if(!store.state.admin){
        store.dispatch(storeTypes.UPDATE_ADMIN).then(res => {
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
