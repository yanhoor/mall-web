<template>
    <div class="page_container">
        <Form ref="formRef" :model="form" :rules="rules" :labelCol="{span: 6}" :wrapperCol="{span: 18}">
            <Form-item label="配置名称" name="name">
                <Input placeholder="请输入配置名称" v-model:value="form.name"/>
            </Form-item>
            <Form-item label="logo" name="logo">
                <Upload v-model:value="form.logo"/>
            </Form-item>
            <Form-item label="浮层链接" name="float_icon_link">
                <Input placeholder="请输入浮层链接" v-model:value="form.float_icon_link"/>
            </Form-item>
            <Form-item label="浮层图标" name="float_icon">
                <Upload v-model:value="form.float_icon"/>
            </Form-item>
            <Form-item label="浮层有效时间" name="float_valid_time_range">
                <RangePicker show-time format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" :mode="['date', 'date']" v-model:value="form.float_valid_time_range"></RangePicker>
            </Form-item>
        </Form>
        <h4>轮播图配置 <Button @click="addBanner" type="text" style="color: #4098ef">添加</Button></h4>
        <template v-for="(banner, i) of form.banner_list">
            <Card class="banner_item_wrapper">
                <h5>轮播图{{ i +1 }} 信息</h5>
                <Banner :banner="banner" :ref="el => { if (el) bannerForm[i] = el }"></Banner>
            </Card>
        </template>
        <Row>
            <Button @click="validateForm">保存</Button>
        </Row>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onBeforeUpdate, ref } from 'vue'
    import { Form, Input, FormItem, Row, Col, Button, Select, SelectOption, InputNumber, Card, RangePicker } from 'ant-design-vue'
    import GoodsModel from './config/model'
    import formRules from './config/formRules'
    import Upload from '@/components/customAnt/upload.vue'
    import Banner from './components/_banner.vue'

    export default defineComponent({
        name: 'home-config-edit',
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
            RangePicker,
            Upload,
            Banner,
        },
        setup(props, ctx){
            let model = props.model as GoodsModel
            let form = model.itemForm
            const rules = formRules
            const bannerForm = ref([])
            const formRef = ref()

            const addBanner = () => {
                form.banner_list.push(model.createBannerItem())
            }

            // 确保在每次更新之前重置ref
            onBeforeUpdate(() => {
                bannerForm.value = []
            })

            const validateForm = async() => {
                formRef.value.validate().then(() => {
                    Promise.all(bannerForm.value.map((banner: any) => banner.validateForm())).then(() => {
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
                bannerForm,
                formRef,
                addBanner,
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
    .banner_item_wrapper{
        background-color: #f9fafc;
        margin-bottom: 10px;
    }
</style>
