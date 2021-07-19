<template>
    <Drawer :visible="visible" @update:visible="onVisibleUpdate" :width="width" @close="onClose" :title="title">
        <slot></slot>
    </Drawer>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue'
    import { Drawer } from 'ant-design-vue'

    export default defineComponent({
        name: 'custom-drawer',
        // inheritAttrs: false,
        components: {
            Drawer,
        },
        props: {
            visible: {
                type: Boolean,
                required: true,
            },
            width: {
                type: String,
                default: '500'
            },
            title: {
                type: String,
                default: ''
            },
        },
        emits: ['update:visible', 'close'],
        setup(props, ctx){
            const onClose = () => {
                ctx.emit('close')
            }

            const onVisibleUpdate = (v: any) => {
                ctx.emit('update:visible', v)
            }

            return {
                onClose,
                onVisibleUpdate,
            }
        },
    })

</script>

<style lang="less" scoped>
    :deep(.actions){
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #e9e9e9;
        padding: 10px 16px;
        background: #fff;
        text-align: center;
        z-index: 1;
    }
</style>
