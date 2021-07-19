<template>
    <div class="page_container">
        <Form :model="form" :rules="rules" :labelCol="{span: 6}" :wrapperCol="{span: 12}">
            <Form-item label="姓名" name="name">
                <Input placeholder="请输入姓名" v-model:value="form.name"/>
            </Form-item>
            <Form-item label="年龄" name="age">
                <Input placeholder="请输入年龄" v-model:value="form.age"/>
            </Form-item>
            <Form-item label="手机号" name="mobile">
                <Input placeholder="请输入手机号" v-model:value="form.mobile"/>
            </Form-item>
            <Form-item label="用户标签" name="labelIds">
                <Select mode="multiple" v-model:value="form.labelIds" placeholder="请选择">
                    <SelectOption v-for="label of model.labelList" :key="label.id" :value="label.id">
                        {{ label.name }}
                    </SelectOption>
                </Select>
            </Form-item>
        </Form>
        <Row>
            <Button @click="model.saveForm()">保存</Button>
        </Row>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, inject } from 'vue'
    import { Form, Input, FormItem, Row, Col, Button, Select, SelectOption } from 'ant-design-vue'
    import UserModel from './config/model'
    import formRules from './config/formRules'

    export default defineComponent({
        name: 'user-edit',
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
            Select,
            SelectOption,
        },
        setup(props, ctx){
            let model = props.model as UserModel
            let form = model.userForm
            const rules = formRules

            return {
                model,
                form,
                rules
            }
        }
    })
</script>
