<template>
    <Layout>
        <LayoutSider class="layout_left" collapsible>
            <LeftMenu></LeftMenu>
        </LayoutSider>
        <Layout class="layout_right" id="layoutRight">
            <LayoutHeader class="layout_header">
                <TopHeader></TopHeader>
            </LayoutHeader>
            <LayoutContent>
                <Card class="page_container">
                    <router-view/>
                </Card>
            </LayoutContent>
        </Layout>
    </Layout>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue'
    import { Layout, LayoutSider, LayoutContent, LayoutHeader, Card } from 'ant-design-vue'
    import LeftMenu from './components/_menu.vue'
    import TopHeader from './components/_header.vue'

    export default defineComponent({
        name: 'layout',
        components: {
            Layout,
            LayoutSider,
            LayoutContent,
            LayoutHeader,
            Card,
            LeftMenu,
            TopHeader,
        },
        setup(props, ctx){

        }
    })
</script>

<style lang="less" scoped>
    .layout_left{
        overflow: auto;
        height: 100vh;
    }
    .layout_right{
        min-height: 100vh;
        .layout_header{
            background-color: #eff2f7;
            padding: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
