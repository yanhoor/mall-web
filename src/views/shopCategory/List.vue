<template>
    <div>
        <Row>
            <Col :span="8">
                <Form-item label="分类名称">
                    <Input placeholder="请输入分类名称" v-model:value="form.name"/>
                </Form-item>
            </Col>
        </Row>
        <Button @click="model.getListData()">查询</Button>
        <Button @click="addItem">新增</Button>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model"></Table>
    </div>
    <Drawer v-model:visible="model.showEdit" width="500" @close="model.closeEdit()" :title="model.itemForm.id ? '编辑店铺标签' : '新增店铺标签'">
        <Edit :model="model"></Edit>
    </Drawer>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue'
    import { Form, FormItem, Input, Row, Col, Button } from 'ant-design-vue'
    import Table from '@/components/customAnt/table.vue'
    import Drawer from '@/components/customAnt/drawer.vue'
    import Edit from './Edit.vue'
    import columns from "./config/columns";
    import ShopCategoryModel from "@/views/shopCategory/config/model";

    export default defineComponent({
        name: 'shopCategory',
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
            const model = reactive<ShopCategoryModel>(new ShopCategoryModel())
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

            return {
                model,
                form,
                columns,
                handleAction,
                addItem,
            }
        }
    })
</script>
