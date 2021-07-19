<template>
    <div class="page_container">
        <Form :model="form" :rules="rules" :labelCol="{span: 6}" :wrapperCol="{span: 12}">
            <Form-item label="标签名称" name="name">
                <Input placeholder="请输入标签名称" v-model:value="form.name"/>
            </Form-item>
            <Form-item label="颜色" name="color">
                <input type="color" v-model="form.color" />
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
    import UserLabelModel from './config/model'
    import formRules from './config/formRules'

    export default defineComponent({
        name: 'user-label-edit',
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
            let model = props.model as UserLabelModel
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
