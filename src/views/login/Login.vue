<template>
    <div class="login_page">
        <div class="container">
            <Form ref="formRef" :rules="rules" :model="form" :labelCol="{span: 6}" :wrapperCol="{span: 18}">
                <FormItem label="手机号" name="mobile">
                    <Input v-model:value="form.mobile">
                        <template #prefix> <UserOutlined twoToneColor="#52c41a"></UserOutlined> </template>
                    </Input>
                </FormItem>
                <FormItem label="密码" name="password">
                    <Input type="password" v-model:value="form.password">
                        <template #prefix> <LockOutlined twoToneColor="#52c41a"></LockOutlined> </template>
                    </Input>
                </FormItem>
                <FormItem label="账号类型" name="type" v-if="isRegister">
                    <RadioGroup v-model:value="form.type" style="width: 100%; text-align: left">
                        <RadioButton value="1">超级管理员</RadioButton>
                        <RadioButton value="2">店铺管理员</RadioButton>
                    </RadioGroup>
                </FormItem>
            </Form>
            <Space direction="vertical" style="width: 100%">
                <Button class="btn" type="primary" block @click="validateForm(1)" v-if="!isRegister">登录</Button>
                <Button type="link" block @click="toRegister" v-if="!isRegister">没有账号？去注册</Button>
                <Button class="btn" type="primary" block @click="validateForm(2)" v-if="isRegister">注册</Button>
                <Button type="link" block @click="isRegister = false" v-if="isRegister">已有账号？去登录</Button>
            </Space>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import * as storeTypes from '@/store/types'
    import jsCookie from 'js-cookie'
    import { Form, FormItem, Input, RadioGroup, RadioButton, Space, Button } from 'ant-design-vue'
    import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
    import LoginModel from './config/model'
    import formRules from './config/formRules'

    export default defineComponent({
        name: 'login',
        components: {
            Form,
            FormItem,
            Input,
            Space,
            Button,
            RadioGroup,
            RadioButton,
            UserOutlined,
            LockOutlined,
        },
        setup(props, ctx){
            const formRef = ref()
            const router = useRouter()
            const store = useStore()
            const model = reactive<LoginModel>(new LoginModel())
            const form = model.form
            const rules = formRules
            const isRegister = ref(false)

            // 清空登录信息
            jsCookie.remove('SID')
            store.commit(storeTypes.UPDATE_ADMIN, null)

            const validateForm = async (type: number) => {
                const r = await formRef.value.validate().catch((e: any) => {
                    model.$message.error('请将信息填写完整')
                    throw new Error()
                })
                if(type === 1){
                    const res = await model.login()
                    if(res){
                        router.push({name: 'Home'})
                    }
                }else if(type === 2){
                    model.register()
                }
            }

            const toRegister = () => {
                isRegister.value = true
            }

            return {
                formRef,
                model,
                form,
                rules,
                isRegister,
                validateForm,
                toRegister,
            }
        }
    })
</script>

<style lang="less" scoped>
    .login_page{
        width: 100vw;
        height: 100vh;
        background-color: #05529e;
        .container{
            width: 400px;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #fefefe;
            padding: 30px;
            border-radius: 5px;
            text-align: center;
            .btn{
                width: 100%;
            }
        }
    }
</style>
