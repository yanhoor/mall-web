import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import userRoute from '@/views/user/config/route'
import userLabelRoute from '@/views/userLabel/config/route'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/user'
  },
  userRoute,
  userLabelRoute,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
