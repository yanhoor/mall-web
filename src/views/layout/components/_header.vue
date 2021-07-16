<template>
    <Breadcrumb>
        <BreadcrumbItem v-for="route of routes.matched">
            <Button type="link" :disabled="routes.path === route.path">{{ route.meta.title }}</Button>
        </BreadcrumbItem>
    </Breadcrumb>
    <Dropdown>
        <Avatar size="large" style="margin-right: 20px">
            <template #icon> <UserOutlined></UserOutlined> </template>
        </Avatar>
        <template #overlay>
            <Menu>
                <a-menu-item @click.stop="clickMenu(1)">个人信息</a-menu-item>
                <a-menu-item @click.stop="clickMenu(2)">退出</a-menu-item>
            </Menu>
        </template>
    </Dropdown>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { Breadcrumb, BreadcrumbItem, Button, Avatar, Dropdown, Menu, MenuItem, message } from 'ant-design-vue'
    import { UserOutlined } from '@ant-design/icons-vue'
    import $http from '@/http'
    import urls from '@/http/urls'

    export default defineComponent({
        name: 'layout-header',
        components: {
            Breadcrumb,
            BreadcrumbItem,
            Button,
            Avatar,
            Dropdown,
            Menu,
            [MenuItem.name]: MenuItem,
            UserOutlined,
        },
        setup(props, ctx){
            const router = useRouter()
            const routes = useRoute()

            const clickMenu = (num: number) => {
                switch (num) {
                    case 1:
                        router.push('/admin')
                        break
                    case 2:
                        $http.fetch(urls.adminLogout).then(r => {
                            if(r.success){
                                router.push('/login')
                            }
                            message.success(r.msg)
                        })
                }
            }

            return {
                routes,
                clickMenu,
            }
        }
    })

</script>
