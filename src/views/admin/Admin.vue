<template>
    <div>
        <Descriptions title="个人信息" bordered>
            <DescriptionsItem label="手机号">{{ form.mobile }}</DescriptionsItem>
            <DescriptionsItem label="密码">{{ form.password }}</DescriptionsItem>
            <DescriptionsItem label="注册时间">{{ form.create_time }}</DescriptionsItem>
            <DescriptionsItem label="最后修改时间">{{ form.modify_time }}</DescriptionsItem>
            <DescriptionsItem label="头像">
                <Upload @completed="uploadCompleted" :img-path="form.avatar" :uploadPath="model.$urls.adminUpdateAvatar"></Upload>
            </DescriptionsItem>
        </Descriptions>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue'
    import { Descriptions, DescriptionsItem } from 'ant-design-vue'
    import AdminModel from './config/model'
    import Upload from '@/components/customAnt/upload.vue'

    export default defineComponent({
        name: 'admin',
        components: {
            Descriptions,
            DescriptionsItem,
            Upload,
        },
        setup(props, ctx){
            const model = reactive<AdminModel>(new AdminModel())
            const form = model.form
            model.getUserInfo()

            const uploadCompleted = (path: string) => {
                form.avatar = path
            }

            return {
                model,
                form,
                uploadCompleted,
            }
        },
    })
</script>
