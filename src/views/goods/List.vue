<template>
    <div>
        <Row>
            <Col :span="8">
                <Form-item label="商品名称">
                    <Input placeholder="请输入商品名称" v-model:value="form.name"/>
                </Form-item>
                <CategorySelect v-model:id-list="cateIdList"></CategorySelect>
            </Col>
        </Row>
        <Button @click="model.getListData()">查询</Button>
        <Button @click="addItem">新增</Button>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model"></Table>
    </div>
    <Drawer v-model:visible="model.showEdit" width="600" @close="model.closeEdit()" :title="model.itemForm.id ? '编辑商品' : '新增商品'">
        <Edit :model="model"></Edit>
    </Drawer>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref, isReactive, isRef} from 'vue'
    import { Form, FormItem, Input, Row, Col, Button } from 'ant-design-vue'
    import Table from '@/components/customAnt/table.vue'
    import Drawer from '@/components/customAnt/drawer.vue'
    import GoodsModel from "./config/model"
    import Edit from './Edit.vue'
    import columns from "./config/columns"
    import CategorySelect from './components/_categorySelect.vue'

    export default defineComponent({
        name: 'goods-list',
        components: {
            Edit,
            Table,
            FormItem,
            Button,
            Drawer,
            Row,
            Col,
            Input,
            CategorySelect,
        },
        setup(props, ctx){
            let model = reactive<GoodsModel>(new GoodsModel())
            model.initData()
            const form = model.filterForm
            let cateIdList = ref([])

            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                const idList = data.labelList.map((label: any) => label.id)
                model.itemForm = Object.assign(model.itemForm, data, {labelList: idList}) // todo: 不可以直接赋值
                model.getLabelList()
            }

            const addItem = () => {
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, model.initForm())
                console.log('---------------', model.itemForm)
                model.getLabelList()
            }

            return {
                model,
                form,
                columns,
                handleAction,
                addItem,
                cateIdList,
            }
        }
    })
</script>
