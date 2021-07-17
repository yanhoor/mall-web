<template>
    <Menu
            class="menu"
            mode="inline"
            theme="dark"
            v-model:selectedKeys="selectedKeyList"
            v-model:openKeys="openKeyList">
        <template v-for="menu1 of menus">
            <template v-if="menu1.children">
                <SubMenu :key="menu1.key">
                    <template #icon>
                        <component :is="menu1.icon"/>
                    </template>
                    <template #title>{{ menu1.title }}</template>
                    <template v-for="menu2 of menu1.children">
                        <template v-if="menu2.children">
                            <SubMenu :key="menu2.key">
                                <template #icon>
                                    <component :is="menu2.icon"/>
                                </template>
                                <template #title>{{ menu2.title }}</template>
                                <a-menu-item v-for="menu3 of menu2.children" :key="menu3.key" @click.stop="menuClick(menu3)">
                                    <template #icon>
                                        <component :is="menu3.icon"/>
                                    </template>
                                    {{ menu3.title }}
                                </a-menu-item>
                            </SubMenu>
                        </template>
                        <template v-else>
                            <a-menu-item :key="menu2.key" @click.stop="menuClick(menu2)">
                                <template #icon>
                                    <component :is="menu2.icon"/>
                                </template>
                                {{ menu2.title }}
                            </a-menu-item>
                        </template>
                    </template>
                </SubMenu>
            </template>
            <template v-else>
                <a-menu-item :key="menu1.key" @click.stop="menuClick(menu1)">
                    <template #icon>
                        <component :is="menu1.icon"/>
                    </template>
                    {{ menu1.title }}
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
