<template>
  <Layout>
    <Layout-Sider>23</Layout-Sider>
    <Layout>
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
    name: 'app',
    components: {
      Layout,
      LayoutSider,
      LayoutContent,
      LayoutHeader
    },
  })
</script>

<style lang="less">

</style>
