<template>
    <ListWrapper>
        <template #filterForm>
            <Form layout="inline" ref="formRef" :model="form">
                <Row style="width: 100%" :gutter="[0, 10]">
                    <Col :span="8">
                        <Form-item label="姓名" name="name">
                            <Input placeholder="请输入姓名" v-model:value="form.name"/>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </template>

        <template #filterActions>
            <Button @click="model.getListData()">查询</Button>
            <Button @click="resetForm">重置</Button>
            <Button @click="addUser">新增</Button>
        </template>

        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model"></Table>
        <Drawer v-model:visible="model.showEdit" width="500" @close="model.closeEdit()" :title="model.userForm.id ? '编辑用户' : '新增用户'">
            <Edit :model="model"></Edit>
        </Drawer>
    </ListWrapper>
</template>

<script lang="ts">
    import {defineComponent, reactive, provide, isReactive, isRef, ref} from 'vue'
    import { Form, FormItem, Input, Row, Col, Button } from 'ant-design-vue'
    import ListWrapper from '../layout/components/_listContainer.vue'
    import Table from '@/components/customAnt/table.vue'
    import Drawer from '@/components/customAnt/drawer.vue'
    import UserModel from "@/views/user/config/model";
    import Edit from './Edit.vue'
    import columns from "./config/columns";

    export default defineComponent({
        name: 'user',
        components: {
            ListWrapper,
            Edit,
            Table,
            Form,
            FormItem,
            Button,
            Drawer,
            Row,
            Col,
            Input,
        },
        setup(props, ctx){
            let model = reactive<UserModel>(new UserModel())
            model.initData()
            const form = model.filterForm
            const formRef = ref()

            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                const idList = data.labelList.map((label: any) => label.id)
                model.userForm = Object.assign(model.userForm, data, {labelList: idList}) // todo: 不可以直接赋值
                model.getLabelList()
            }

            const addUser = () => {
                model.showEdit = true
                model.userForm = Object.assign(model.userForm, model.initForm())
                model.getLabelList()
            }

            const resetForm = () => {
                formRef.value.resetFields()
                model.getListData()
            }

            return {
                model,
                form,
                formRef,
                columns,
                handleAction,
                addUser,
                resetForm,
            }
        }
    })
</script>
