<template>
    <ListWrapper>
        <template #filterForm>
            <Form layout="inline" ref="formRef" :model="form">
                <Row style="width: 100%" :gutter="[0, 10]">
                    <Col :span="8">
                        <Form-item label="用户名" name="name">
                            <Input placeholder="请输入用户名" v-model:value="form.name"/>
                        </Form-item>
                    </Col>
                    <Col :span="8">
                        <Form-item label="手机号" name="mobile">
                            <Input placeholder="请输入手机号" v-model:value="form.mobile"/>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </template>
        <template #filterActions>
            <Button @click="model.getListData()">查询</Button>
            <Button @click="resetForm">重置</Button>
        </template>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model"></Table>
    </ListWrapper>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref} from 'vue'
    import { Form, FormItem, Input, Row, Col, Button } from 'ant-design-vue'
    import ListWrapper from '../layout/components/_listContainer.vue'
    import Table from '@/components/customAnt/table.vue'
    import AdminModel from './config/model'
    import columns from "./config/columns"

    export default defineComponent({
        name: 'admin-list',
        components: {
            ListWrapper,
            Table,
            Form,
            FormItem,
            Input,
            Row,
            Col,
            Button,
        },
        setup(props, ctx){
            const model = reactive<AdminModel>(new AdminModel())
            model.initData()
            const formRef = ref()
            const form = model.filterForm

            const handleAction = async (type: string, data: any) => {
                let result
                switch (type) {
                    case 'disabled':
                        result = await model.changeState(data.id, 2)
                        break
                    case 'enable':
                        result = await model.changeState(data.id, 1)
                        break
                }
                if(result){
                    await model.refresh()
                }
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
                resetForm,
            }
        },
    })
</script>
