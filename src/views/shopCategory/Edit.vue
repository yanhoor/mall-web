<template>
    <div class="page_container">
        <Form :model="form" :rules="rules" :labelCol="{span: 3}" :wrapperCol="{span: 12}">
            <Form-item label="分类名称" name="name">
                <Input placeholder="请输入分类名称" v-model:value="form.name"/>
            </Form-item>
        </Form>
        <Row>
            <Button @click="model.saveForm()">保存</Button>
        </Row>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, inject } from 'vue'
    import { Form, Input, FormItem, Row, Col, Button } from 'ant-design-vue'
    import ShopCategoryModel from './config/model'
    import formRules from './config/formRules'

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
        },
        setup(props, ctx){
            let model = props.model as ShopCategoryModel
            let form = model.itemForm
            const rules = formRules

            return {
                model,
                form,
                rules
            }
        }
    })
</script>
