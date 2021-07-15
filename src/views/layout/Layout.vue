<template>
    <Layout>
        <Layout-Sider>23</Layout-Sider>
        <Layout class="layout_right">
            <Layout-Header>

            </Layout-Header>
            <Layout-Content>
                <router-view/>
            </Layout-Content>
        </Layout>
    </Layout>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import { Layout, LayoutSider, LayoutContent, LayoutHeader } from 'ant-design-vue'

    export default defineComponent({
        name: 'layout',
        components: {
            Layout,
            LayoutSider,
            LayoutContent,
            LayoutHeader
        },
    })
</script>

<style lang="less" scoped>
    .layout_right{
        min-height: 100vh;
    }
</style>
