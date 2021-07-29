<template>
    <div class="page_container">
        <Form ref="formRef" :model="form" :rules="rules" :labelCol="{span: 6}" :wrapperCol="{span: 12}">
            <Form-item label="分类名称" name="name">
                <Input placeholder="请输入分类名称" v-model:value="form.name"/>
            </Form-item>
            <Form-item label="图标" name="icon">
                <Upload v-model:value="form.icon"></Upload>
            </Form-item>
        </Form>
        <Row>
            <Button @click="validateForm">保存</Button>
        </Row>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, inject, ref} from 'vue'
    import { Form, Input, FormItem, Row, Col, Button } from 'ant-design-vue'
    import ShopCategoryModel from './config/model'
    import formRules from './config/formRules'
    import Upload from '@/components/customAnt/upload.vue'
    import * as storeTypes from "@/store/types";

    export default defineComponent({
        name: 'shop-category-edit',
        props: {
            model: Object
        },
        components: {
            Form,
            FormItem,
            Input,
            Row,
            Col,
            Button,
            Upload,
        },
        setup(props, ctx){
            let model = props.model as ShopCategoryModel
            let form = model.itemForm
            const rules = formRules
            const formRef = ref()

            const validateForm = () => {
                formRef.value.validate().then( (r: any) => {
                    model.saveForm()
                }).catch((e: any) => {
                    model.$message.error(e.message ?? '请将信息填写完整')
                })
            }

            return {
                model,
                form,
                rules,
                formRef,
                validateForm,
            }
        }
    })
</script>
