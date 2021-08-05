<template>
    <div class="banner_item">
        <Form ref="formRef" :model="banner" :rules="rules" :labelCol="{span: 6}" :wrapperCol="{span: 12}">
            <Form-item label="图片" name="img">
                <Upload v-model:value="banner.img"/>
            </Form-item>
            <Form-item label="颜色" name="color">
                <input type="color" v-model="banner.color" />
            </Form-item>
            <Form-item label="指向链接" name="link">
                <Input placeholder="请输入指向链接" v-model:value="banner.link"/>
            </Form-item>
        </Form>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue'
    import { Form, Input, FormItem, Row, Col, Button, Select, SelectOption, InputNumber } from 'ant-design-vue'
    import formRules from '../config/formRules'
    import Upload from '@/components/customAnt/upload.vue'

    export default defineComponent({
        name: 'home-config-edit-banner',
        props: {
            banner: Object
        },
        components: {
            Form,
            FormItem,
            Input,
            Row,
            Col,
            Button,
            Select,
            SelectOption,
            InputNumber,
            Upload,
        },
        setup(props, ctx){
            const rules = formRules
            const formRef = ref()

            const validateForm = (): Promise<void> => {
                return formRef.value.validate()
            }

            return {
                rules,
                formRef,
                validateForm,
            }
        }
    })
</script>

<style lang="less" scoped>
    :deep(.ant-input-number){
        width: 100%;
    }
    :deep(.ant-calendar-picker){
        width: 100% !important;
    }
</style>
