<template>
    <div class="page_container">
        <Row>
            <Col :span="8">
                <Form-item label="姓名">
                    <Input placeholder="请输入姓名" v-model:value="form.name"/>
                </Form-item>
            </Col>
        </Row>
        <Button @click="model.getListData()">查询</Button>
        <Button @click="addItem">新增</Button>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :pagination="model.pagination" @tableChange="handleTableChange"></Table>
    </div>
    <Drawer v-model:visible="model.showEdit" width="700" @close="model.closeEdit()" :title="model.itemForm.id ? '编辑用户' : '新增用户'">
        <Edit :model="model"></Edit>
    </Drawer>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue'
    import { Form, FormItem, Input, Drawer, Row, Col, Button } from 'ant-design-vue'
    import Table from '@/components/customAnt/table.vue'
    import Edit from './Edit.vue'
    import columns from "./config/columns";
    import UserLabelModel from "@/views/userLabel/config/model";

    export default defineComponent({
        name: 'userLabel',
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
            const model = reactive<UserLabelModel>(new UserLabelModel())
            model.initData()
            const form = model.filterForm

            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, data) // todo: 不可以直接赋值
            }
            const addItem = () => {
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, model.initForm()) // todo: 不可以直接赋值
            }
            const handleTableChange = (page: any, filters: any, sorter: any) => {
                model.pagination.current = page.current
                model.pagination.pageSize = page.pageSize
                model.getListData()
            }

            return {
                model,
                form,
                columns,
                handleAction,
                addItem,
                handleTableChange,
            }
        }
    })
</script>
