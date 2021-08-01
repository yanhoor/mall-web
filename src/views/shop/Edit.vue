<template>
    <div class="page_container">
        <Form ref="formRef" :model="form" :rules="rules" :labelCol="{span: 6}">
            <Row>
                <Col :span="colSpan">
                    <Form-item label="店铺名称" name="name">
                        <Input placeholder="请输入店铺名称" v-model:value="form.name"/>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="联系电话" name="contract">
                        <Input placeholder="请输入联系电话" v-model:value="form.contract"/>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="店铺类别" name="shop_category_id">
                        <Select v-model:value="form.shop_category_id">
                            <SelectOption v-for="cate of model.cateList" :key="cate.id" :value="cate.id">
                                {{ cate.name }}
                            </SelectOption>
                        </Select>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="店铺简介" name="desc">
                        <Textarea placeholder="请输入店铺简介" v-model:value="form.desc"/>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="店铺标语" name="slogan">
                        <Textarea placeholder="请输入店铺标语" v-model:value="form.slogan"/>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="营业时间" name="opening_range">
                        <RangePicker show-time format="HH:mm:ss" valueFormat="HH:mm:ss" :mode="['time', 'time']" v-model:value="form.opening_range"></RangePicker>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="店铺头像" name="avatar">
                        <Upload v-model:value="form.avatar"></Upload>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="营业执照" name="business_license">
                        <Upload v-model:value="form.business_license"></Upload>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="服务许可证" name="service_permission">
                        <Upload v-model:value="form.service_permission"></Upload>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="配送费" name="deliver_fee">
                        <InputNumber placeholder="请输入配送费" v-model:value="form.deliver_fee"/>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="起送价" name="deliver_fee_start_amount">
                        <InputNumber placeholder="请输入起送价" v-model:value="form.deliver_fee_start_amount"/>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="地区" name="codeList">
                        <AddressPicker v-model:addressName="form.headAddress" v-model:codeList="form.codeList"></AddressPicker>
                    </Form-item>
                </Col>
                <Col :span="colSpan">
                    <Form-item label="详细地址" name="tailAddress">
                        <Input placeholder="请输入详细地址" v-model:value="form.tailAddress"/>
                    </Form-item>
                </Col>
            </Row>
        </Form>
        <Row class="actions">
            <Button @click="validateForm">保存</Button>
        </Row>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch, ref} from 'vue'
    import { useStore } from 'vuex'
    import * as storeTypes from '@/store/types'
    import { Form, Input, FormItem, Row, Col, Button, Textarea, Select, SelectOption, RangePicker, InputNumber } from 'ant-design-vue'
    import ShopModel from './config/model'
    import formRules from './config/formRules'
    import Upload from '@/components/customAnt/upload.vue'
    import AddressPicker from '@/components/customAnt/addressPicker.vue'

    interface Props{
        model: any,
        colSpan: number,
    }

    export default defineComponent({
        name: 'shop-category-edit',
        props: {
            model: Object,
            colSpan: {
                type: Number,
                default: 24
            },
        },
        components: {
            Form,
            FormItem,
            Input,
            Row,
            Col,
            Button,
            Textarea,
            Select,
            SelectOption,
            RangePicker,
            Upload,
            InputNumber,
            AddressPicker,
        },
        setup(props: Props, ctx){
            const store = useStore()
            let model = props.model as ShopModel
            let form = model.itemForm
            const rules = formRules
            const formRef = ref()

            const validateForm = () => {
                formRef.value.validate().then( (r: any) => {
                    if (form.codeList.length < 3) throw new Error('请选择完整地址')
                    model.saveForm().then(r => {
                        if(r){
                            form.id = r.id
                            store.dispatch(storeTypes.UPDATE_ADMIN)
                        }
                    })
                }).catch((e: any) => {
                    model.$message.error(e.message ?? '请将信息填写完整')
                })
            }

            const onTimeRangeChange = (t: any, ts: any) => {
                console.log(t, ts)
            }

            return {
                model,
                form,
                rules,
                formRef,
                validateForm,
                onTimeRangeChange,
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
</style>
