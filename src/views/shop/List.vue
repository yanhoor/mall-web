<template>
    <ListWrapper>
        <template #filterForm>
            <Form layout="inline" ref="formRef" :model="form">
                <Row style="width: 100%" :gutter="[0, 10]">
                    <Col :span="8">
                        <Form-item label="店铺名称" name="name">
                            <Input placeholder="请输入店铺名称" v-model:value="form.name"/>
                        </Form-item>
                    </Col>
                    <Col :span="8">
                        <Form-item label="店铺类别" name="shop_category_id">
                            <Select v-model:value="form.shop_category_id">
                                <SelectOption v-for="cate of model.cateList" :key="cate.id" :value="cate.id">
                                    {{ cate.name }}
                                </SelectOption>
                            </Select>
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
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction" :model="model" :expanded="true">
            <template #expand="{record}">
                <Form layout="inline" :labelCol="{span: 14}" :wrapperCol="{span: 24}" class="table_form">
                    <FormItem label="名称">
                        <span class="expand_item_content">{{ record.name }}</span>
                    </FormItem>
                    <FormItem label="联系电话">
                        <span class="expand_item_content">{{ record.contract }}</span>
                    </FormItem>
                    <FormItem label="所属分类">
                        <span class="expand_item_content">{{ record.category.length ? record.category[0].name : '-' }}</span>
                    </FormItem>
                    <FormItem label="简介">
                        <span class="expand_item_content">{{ record.desc }}</span>
                    </FormItem>
                    <FormItem label="标语">
                        <span class="expand_item_content">{{ record.slogan }}</span>
                    </FormItem>
                    <FormItem label="营业时间">
                        <span class="expand_item_content">{{ record.opening_range.join(' 至 ') }}</span>
                    </FormItem>
                    <FormItem label="配送费">
                        <span class="expand_item_content">{{ record.deliver_fee }}</span>
                    </FormItem>
                    <FormItem label="起送价">
                        <span class="expand_item_content">{{ record.deliver_fee_start_amount }}</span>
                    </FormItem>
                    <FormItem label="地址">
                        <span class="expand_item_content">{{ record.headAddress + record.tailAddress }}</span>
                    </FormItem>
                    <FormItem label="创建人">
                        <span class="expand_item_content">{{ record.admin && record.admin.length ? record.admin[0].name : '' }}</span>
                    </FormItem>
                    <FormItem label="创建时间">
                        <span class="expand_item_content">{{ record.create_time }}</span>
                    </FormItem>
                    <FormItem label="最后修改时间">
                        <span class="expand_item_content">{{ record.modify_time }}</span>
                    </FormItem>
                </Form>
            </template>
        </Table>
        <Drawer v-model:visible="model.showEdit" width="600" @close="model.closeEdit()" :title="model.itemForm.id ? '编辑店铺信息' : '新增店铺信息'">
            <Edit :model="model"></Edit>
        </Drawer>
    </ListWrapper>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from 'vue'
    import { Form, FormItem, Input, Row, Col, Button, Select, SelectOption } from 'ant-design-vue'
    import ListWrapper from '../layout/components/_listContainer.vue'
    import Table from '@/components/customAnt/table.vue'
    import Drawer from '@/components/customAnt/drawer.vue'
    import Edit from './Edit.vue'
    import columns from "./config/columns"
    import ShopModel from "@/views/shop/config/model"

    export default defineComponent({
        name: 'shop',
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
            Select,
            SelectOption,
        },
        setup(props, ctx){
            const model = reactive<ShopModel>(new ShopModel())
            const formRef = ref()
            model.initData()
            const form = model.filterForm
            model.getCateList()

            const resetForm = () => {
                formRef.value.resetFields()
                model.getListData()
            }
            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                model.getDetail(data.id)
                model.getCateList()
            }
            const addItem = () => {
                model.showEdit = true
                model.itemForm = Object.assign(model.itemForm, model.initForm()) // todo: 不可以直接赋值
                model.getCateList()
            }

            return {
                model,
                form,
                formRef,
                columns,
                resetForm,
                handleAction,
                addItem,
            }
        }
    })
</script>

<style lang="less" scoped>

    .table_form{
        :deep(.ant-form-item){
            width: 45%;
            .expand_item_content{
                color: var(--text-color-minor);
            }
        }
    }
</style>
