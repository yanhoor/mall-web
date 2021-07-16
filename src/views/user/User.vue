<template>
    <div>
        <Row>
            <Col :span="8">
                <Form-item label="姓名">
                    <Input placeholder="请输入姓名" v-model:value="form.name"/>
                </Form-item>
            </Col>
        </Row>
        <Button @click="model.getListData()">查询</Button>
        <Button @click="addUser">新增</Button>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model"></Table>
    </div>
    <Drawer v-model:visible="model.showEdit" width="700" @close="model.closeEdit()" :title="model.userForm.id ? '编辑用户' : '新增用户'">
        <Edit :model="model"></Edit>
    </Drawer>
</template>

<script lang="ts">
    import {defineComponent, reactive, provide, isReactive, isRef} from 'vue'
    import { Form, FormItem, Input, Drawer, Row, Col, Button } from 'ant-design-vue'
    import Table from '@/components/customAnt/table.vue'
    import UserModel from "@/views/user/config/model";
    import Edit from './Edit.vue'
    import columns from "./config/columns";

    export default defineComponent({
        name: 'user',
        components: {
            Edit,
            Table,
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

            return {
                model,
                form,
                columns,
                handleAction,
                addUser,
            }
        }
    })
</script>
