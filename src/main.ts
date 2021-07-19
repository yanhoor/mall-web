import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/style/common.less'

const app = createApp(App)
moment.locale('zh-cn')
message.config({
    duration: 3,
    top: '100px'
})
app.config.globalProperties.$message = message

app.use(store).use(router).mount('#app')
