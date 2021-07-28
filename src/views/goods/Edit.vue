<template>
    <div class="page_container">
        <Form ref="formRef" :model="form" :rules="rules" :labelCol="{span: 6}" :wrapperCol="{span: 12}">
            <Form-item label="商品名称" name="name">
                <Input placeholder="请输入商品名称" v-model:value="form.name"/>
            </Form-item>
            <Form-item label="描述" name="desc">
                <Input placeholder="请输入描述" v-model:value="form.desc"/>
            </Form-item>
            <Form-item label="商品标签" name="label_ids">
                <Select mode="multiple" v-model:value="form.label_ids" placeholder="请选择">
                    <SelectOption v-for="label of model.labelList" :key="label.id" :value="label.id">
                        {{ label.name }}
                    </SelectOption>
                </Select>
            </Form-item>
            <Form-item label="所属分类" name="category_ids">
                <CategorySelect v-model:id-list="form.category_ids"/>
            </Form-item>
            <Form-item label="商品图片" name="pic_list">
                <UploadList v-model:fileList="form.pic_list"/>
            </Form-item>

        </Form>
        <h4>Sku列表 <Button @click="addSku" type="text" style="color: #4098ef">添加</Button></h4>
        <template v-for="(sku, i) of form.sku_list">
            <Card class="sku_item_wrapper">
                <h5>sku{{ i +1 }} 信息</h5>
                <Sku :sku="sku" :ref="el => { if (el) skuForm[i] = el }"></Sku>
            </Card>
        </template>
        <Row>
            <Button @click="validateForm">保存</Button>
        </Row>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onBeforeUpdate, ref } from 'vue'
    import { Form, Input, FormItem, Row, Col, Button, Select, SelectOption, InputNumber, Card } from 'ant-design-vue'
    import GoodsModel from './config/model'
    import formRules from './config/formRules'
    import CategorySelect from './components/_categorySelect.vue'
    import UploadList from '@/components/customAnt/uploadList.vue'
    import Sku from './components/sku.vue'

    export default defineComponent({
        name: 'goods-edit',
        props: {
            model: Object
        },
        components: {
            Form,
            FormItem,
            Input,
            Row,
            Col,
            Button,
            Select,
            SelectOption,
            InputNumber,
            Card,
            CategorySelect,
            UploadList,
            Sku,
        },
        setup(props, ctx){
            let model = props.model as GoodsModel
            let form = model.itemForm
            const rules = formRules
            const skuForm = ref([])
            const formRef = ref()

            const addSku = () => {
                form.sku_list.push(model.createSkuItem())
            }

            // 确保在每次更新之前重置ref
            onBeforeUpdate(() => {
                skuForm.value = []
            })

            const validateForm = async() => {
                formRef.value.validate().then(() => {
                    Promise.all(skuForm.value.map((sku: any) => sku.validateForm())).then(() => {
                        model.saveForm()
                    }).catch((e: any) => {
                        model.$message.error(e.message ?? '请将信息填写完整')
                    })
                }).catch((e: any) => {
                    model.$message.error(e.message ?? '请将信息填写完整')
                })
            }

            return {
                model,
                form,
                rules,
                skuForm,
                formRef,
                addSku,
                validateForm,
            }
        }
    })
</script>

<style lang="less" scoped>
    :deep(.ant-input-number){
        width: 100%;
    }
    :deep(.ant-calendar-picker){
        width: 100% !important;
    }
    .sku_item_wrapper{
        background-color: #f9fafc;
        &+&{
            margin-top: 10px;
        }
    }
</style>
