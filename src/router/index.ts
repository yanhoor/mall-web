import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import userRoute from '@/views/user/config/route'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/user'
  },
  userRoute
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
