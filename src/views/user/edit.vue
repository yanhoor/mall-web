<template>
    <div class="page_container">
        <Form layout="inline" :model="form" :rules="rules">
            <Row>
                <Col :span="6">
                    <Form-item label="姓名" name="name">
                        <Input placeholder="请输入姓名" v-model:value="form.name"/>
                    </Form-item>
                </Col>
                <Col :span="6">
                    <Form-item label="年龄" name="age">
                        <Input placeholder="请输入年龄" v-model:value="form.age"/>
                    </Form-item>
                </Col>
                <Col :span="6">
                    <Form-item label="手机号" name="mobile">
                        <Input placeholder="请输入手机号" v-model:value="form.mobile"/>
                    </Form-item>
                </Col>
            </Row>
        </Form>
        <Row>
            <Button @click="model.saveForm()">保存</Button>
        </Row>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue'
    import { Form, Input, FormItem, Row, Col, Button } from 'ant-design-vue'
    import UserModel from './config/model'
    import formRules from './config/formRules'

    export default defineComponent({
        name: 'user-edit',
        components: {
            Form,
            FormItem,
            Input,
            Row,
            Col,
            Button,
        },
        setup(){
            let model = reactive<UserModel>(new UserModel())
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
