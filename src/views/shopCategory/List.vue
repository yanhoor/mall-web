<template>
    <ListWrapper>
        <template #filterForm>
            <Form layout="inline" ref="formRef" :model="form">
                <Row style="width: 100%" :gutter="[0, 10]">
                    <Col :span="8">
                        <Form-item label="分类名称" name="name">
                            <Input placeholder="请输入分类名称" v-model:value="form.name"/>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </template>
        <template #filterActions>
            <Button @click="model.getListData()">查询</Button>
            <Button @click="resetForm">重置</Button>
            <Button @click="addItem">新增</Button>
        </template>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model"></Table>
        <Drawer v-model:visible="model.showEdit" width="500" @close="model.closeEdit()" :title="model.itemForm.id ? '编辑店铺分类' : '新增店铺分类'">
            <Edit :model="model"></Edit>
        </Drawer>
    </ListWrapper>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref} from 'vue'
    import { Form, FormItem, Input, Row, Col, Button } from 'ant-design-vue'
    import ListWrapper from '../layout/components/_listContainer.vue'
    import Table from '@/components/customAnt/table.vue'
    import Drawer from '@/components/customAnt/drawer.vue'
    import Edit from './Edit.vue'
    import columns from "./config/columns";
    import ShopCategoryModel from "@/views/shopCategory/config/model";

    export default defineComponent({
        name: 'shopCategory',
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
            const model = reactive<ShopCategoryModel>(new ShopCategoryModel())
            model.initData()
            const formRef = ref()
            const form = model.filterForm

            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, data) // todo: 不可以直接赋值
            }
            const addItem = () => {
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, model.initForm()) // todo: 不可以直接赋值
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
                addItem,
                resetForm,
            }
        }
    })
</script>
