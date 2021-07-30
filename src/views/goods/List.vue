<template>
    <ListWrapper>
        <template #filterForm>
            <Form layout="inline" ref="formRef" :model="form">
                <Row style="width: 100%" :gutter="[0, 10]">
                    <Col :span="8">
                        <Form-item label="商品名称" name="name">
                            <Input placeholder="请输入商品名称" v-model:value="form.name"/>
                        </Form-item>
                    </Col>
                    <Col :span="8">
                        <Form-item label="商品分类" name="category_ids">
                            <CategorySelect v-model:id-list="form.category_ids"></CategorySelect>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </template>

        <template #filterActions>
            <Button @click="model.getListData()">查询</Button>
            <Button @click="addItem">新增</Button>
            <Button @click="resetForm">重置</Button>
            <Button @click="exportExcel">导出</Button>
        </template>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model"></Table>
        <Drawer v-model:visible="model.showEdit" width="600" @close="model.closeEdit()" :title="model.itemForm.id ? '编辑商品' : '新增商品'">
            <Edit :model="model"></Edit>
        </Drawer>
        <iframe name="download" style="display: none"></iframe>
        <form action="/api/goods/export/goods_export" target="download" id="downloadForm" style="display: none">
            <input type="text" name="name" value="23">
        </form>
    </ListWrapper>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref, isReactive, isRef, computed} from 'vue'
    import { Form, FormItem, Input, Row, Col, Button } from 'ant-design-vue'
    import ListWrapper from '../layout/components/_listContainer.vue'
    import Table from '@/components/customAnt/table.vue'
    import Drawer from '@/components/customAnt/drawer.vue'
    import GoodsModel from "./config/model"
    import Edit from './Edit.vue'
    import columns from "./config/columns"
    import CategorySelect from './components/_categorySelect.vue'
    import {useStore} from "vuex"

    export default defineComponent({
        name: 'goods-list',
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
            CategorySelect,
        },
        setup(props, ctx){
            let model = reactive<GoodsModel>(new GoodsModel())
            model.initData()
            const form = model.filterForm
            const formRef = ref()
            const store = useStore()

            const shopId = computed(() => store.state.admin.shop_id)

            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                const idList = data.labelList.map((label: any) => label.id)
                model.itemForm = Object.assign(model.itemForm, data, {labelList: idList}) // todo: 不可以直接赋值
                model.getLabelList()
            }

            const resetForm = () => {
                formRef.value.resetFields()
                model.getListData()
            }

            const addItem = () => {
                if(!shopId.value){
                    model.$message.error('请先添加店铺')
                    return false
                }
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, model.initForm())
                model.getLabelList()
            }

            const exportExcel = () => {
                const form = document.querySelector('#downloadForm') as HTMLFormElement
                form.submit()
            }

            return {
                model,
                formRef,
                form,
                columns,
                handleAction,
                resetForm,
                addItem,
                exportExcel,
            }
        }
    })
</script>
