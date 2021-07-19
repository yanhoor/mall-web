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
                </Form>
            </template>
        </Table>
    </div>
    <Drawer v-model:visible="model.showEdit" width="500" @close="model.closeEdit()" :title="model.itemForm.id ? '编辑店铺信息' : '新增店铺信息'">
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
    import ShopModel from "@/views/shop/config/model";

    export default defineComponent({
        name: 'shop',
        components: {
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
            const model = reactive<ShopModel>(new ShopModel())
            model.initData()
            const form = model.filterForm

            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                data.codeList = [data.provinceCode, data.cityCode, data.countyCode]
                model.itemForm = Object.assign(model.itemForm, data) // todo: 不可以直接赋值
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
                columns,
                handleAction,
                addItem,
            }
        }
    })
</script>

<style lang="less" scoped>
    @import "~@/assets/style/variables";

    .table_form{
        :deep(.ant-form-item){
            width: 45%;
            .expand_item_content{
                color: @minor-font;
            }
        }
    }
</style>
