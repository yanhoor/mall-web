<template>
  <ConfigProvider :locale="zhCN">
    <router-view/>
  </ConfigProvider>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'
  import { ConfigProvider } from 'ant-design-vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN';

  export default defineComponent({
    name: 'app',
    components: {
      ConfigProvider,
    },
    setup(props, ctx){
      return {
        zhCN,
      }
    }
  })
</script>

<style lang="less">

</style>
