<template>
    <Breadcrumb>
        <BreadcrumbItem v-for="route of routes.matched" @click="onClickBreadcrumbItem(route.path)">
            <Button type="link" :disabled="routes.path === route.path">{{ route.meta.title }}</Button>
        </BreadcrumbItem>
    </Breadcrumb>
    <Dropdown>
        <Avatar size="large" style="margin-right: 20px" :src="avatar">
        </Avatar>
        <template #overlay>
            <Menu>
                <a-menu-item @click.stop="clickMenu(1)">
                    <template #icon>
                        <UserOutlined />
                    </template>
                    个人信息
                </a-menu-item>
                <a-menu-item @click.stop="clickMenu(2)">
                    <template #icon>
                        <LogoutOutlined />
                    </template>
                    退出
                </a-menu-item>
            </Menu>
        </template>
    </Dropdown>
</template>

<script lang="ts">
    import {defineComponent, createVNode, computed} from 'vue'
    import { useStore } from 'vuex'
    import { useRouter, useRoute } from 'vue-router'
    import { Breadcrumb, BreadcrumbItem, Button, Avatar, Dropdown, Menu, MenuItem, message, Modal } from 'ant-design-vue'
    import { UserOutlined, ExclamationCircleOutlined, LogoutOutlined  } from '@ant-design/icons-vue'
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
            LogoutOutlined,
        },
        setup(props, ctx){
            const router = useRouter()
            const routes = useRoute()
            const store = useStore()

            const clickMenu = (num: number) => {
                switch (num) {
                    case 1:
                        router.push('/admin')
                        break
                    case 2:
                        Modal.confirm({
                            title: '确认退出？',
                            icon: createVNode(ExclamationCircleOutlined),
                            onOk(){
                                $http.fetch(urls.adminLogout).then(r => {
                                    if(r.success){
                                        router.push('/login')
                                    }
                                    message.success(r.msg)
                                })
                            },
                        })
                }
            }

            const onClickBreadcrumbItem = (path: string) => {
                router.push(path)
            }

            return {
                routes,
                clickMenu,
                avatar: computed(() => {
                    return urls.IMG_HOST + store.state.admin?.avatar ?? ''
                }),
                onClickBreadcrumbItem,
            }
        }
    })

</script>
