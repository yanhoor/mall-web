export default {
    path: 'user',
    name: 'user',
    meta: {
        title: '用户'
    },
    component: () => import( '../User.vue')
}
