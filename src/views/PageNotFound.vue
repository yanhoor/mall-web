<template>
    <div class="page_not_found">
        <Result status="404" title="404" sub-title="想写几句骚话...">
            <template #extra>
                <Button type="primary" @click="handleClick">返回首页</Button>
            </template>
        </Result>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { Result, Button } from 'ant-design-vue'

    export default defineComponent({
        name: 'page-not-found',
        components: {
            Result,
            Button,
        },
        setup(props, ctx){
            const router = useRouter()
            const handleClick = () => {
                router.replace('/')
            }

            return {
                handleClick,
            }
        }
    })
</script>

<style lang="less" scoped>
    .page_not_found{
        min-width: 100vw;
        min-height: 100vh;
        background-color: #f7f7f7;
    }
</style>
