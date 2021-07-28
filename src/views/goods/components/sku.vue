<template>
    <div class="sku_item">
        <Form ref="formRef" :model="sku" :rules="rules" :labelCol="{span: 6}" :wrapperCol="{span: 12}">
            <Form-item label="名称" name="name">
                <Input placeholder="请输入名称" v-model:value="sku.name"/>
            </Form-item>
            <Form-item label="价格" name="price">
                <InputNumber placeholder="请输入价格" v-model:value="sku.price"/>
            </Form-item>
            <Form-item label="包装费" name="pack_fee">
                <InputNumber placeholder="请输入包装费" v-model:value="sku.pack_fee"/>
            </Form-item>
        </Form>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue'
    import { Form, Input, FormItem, Row, Col, Button, Select, SelectOption, InputNumber } from 'ant-design-vue'
    import formRules from '../config/formRules'
    import CategorySelect from './_categorySelect.vue'

    export default defineComponent({
        name: 'goods-edit-sku',
        props: {
            sku: Object
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
            CategorySelect,
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
