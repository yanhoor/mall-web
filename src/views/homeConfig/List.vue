<template>
    <ListWrapper>
        <template #filterForm>
            <Form layout="inline" ref="formRef" :model="form">
                <Row style="width: 100%" :gutter="[0, 10]">
                    <Col :span="8">
                        <Form-item label="配置名称" name="name">
                            <Input placeholder="请输入配置名称" v-model:value="form.name"/>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </template>

        <template #filterActions>
            <Button @click="model.getListData()">查询</Button>
            <Button @click="addItem">新增</Button>
            <Button @click="resetForm">重置</Button>
        </template>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model"></Table>
        <Drawer v-model:visible="model.showEdit" width="600" @close="model.closeEdit()" :title="model.itemForm.id ? '编辑首页配置' : '新增首页配置'">
            <Edit :model="model"></Edit>
        </Drawer>
    </ListWrapper>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref, isReactive, isRef, computed} from 'vue'
    import { Form, FormItem, Input, Row, Col, Button } from 'ant-design-vue'
    import ListWrapper from '../layout/components/_listContainer.vue'
    import Table from '@/components/customAnt/table.vue'
    import Drawer from '@/components/customAnt/drawer.vue'
    import HomeConfigModel from "./config/model"
    import Edit from './Edit.vue'
    import columns from "./config/columns"

    export default defineComponent({
        name: 'home-config-list',
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
            let model = reactive<HomeConfigModel>(new HomeConfigModel())
            model.initData()
            const form = model.filterForm
            const formRef = ref()

            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, data)  // todo: 不可以直接赋值
            }

            const resetForm = () => {
                formRef.value.resetFields()
                model.getListData()
            }

            const addItem = () => {
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, model.initForm())
            }

            return {
                model,
                formRef,
                form,
                columns,
                handleAction,
                resetForm,
                addItem,
            }
        }
    })
</script>
