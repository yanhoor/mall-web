<template>
    <Menu
            class="menu"
            mode="inline"
            theme="dark"
            v-model:selectedKeys="selectedKeyList"
            v-model:openKeys="openKeyList">
        <template v-for="subMenu of menus">
            <template v-if="subMenu.children">
                <SubMenu :key="subMenu.key">
                    <template #icon>
                        <component :is="subMenu.icon"/>
                    </template>
                    <template #title>{{ subMenu.title }}</template>
                    <a-menu-item v-for="menu of subMenu.children" :key="menu.key" @click.stop="menuClick(menu)">
                        <template #icon>
                            <component :is="menu.icon"/>
                        </template>
                        {{ menu.title }}
                    </a-menu-item>
                </SubMenu>
            </template>
            <template v-else>
                <a-menu-item :key="subMenu.key" @click.stop="menuClick(subMenu)">
                    <template #icon>
                        <component :is="subMenu.icon"/>
                    </template>
                    {{ subMenu.title }}
                </a-menu-item>
            </template>
        </template>
    </Menu>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import Icon from '@ant-design/icons-vue'
    import { Layout, LayoutSider, LayoutContent, LayoutHeader, Menu, SubMenu, MenuItem, Card } from 'ant-design-vue'
    import menus from '../config/menus'

    export default defineComponent({
        name: 'layout-menu',
        components: {
            Layout,
            LayoutSider,
            LayoutContent,
            LayoutHeader,
            Menu,
            SubMenu,
            [MenuItem.name]: MenuItem,
            Icon,
            Card,
        },
        setup(props, ctx){
            const router = useRouter()
            const openKeyList = ref<string[]>([])
            const selectedKeyList = ref<string[]>([])

            const menuClick = (menu: any) => {
                // console.log('subMenuClick', menu)
                router.push(menu.path)
            }

            return {
                menus,
                openKeyList,
                selectedKeyList,
                menuClick,
            }
        }
    })

</script>

<style lang="less" scoped>
    .menu{
        min-height: 100vh;
    }
</style>
