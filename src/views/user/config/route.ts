export default {
    path: '/user',
    name: 'User',
    meta: {
        title: '用户'
    },
    component: () => import( '../User.vue')
}
