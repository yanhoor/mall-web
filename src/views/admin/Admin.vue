<template>
    <div>
        <Descriptions title="个人信息" bordered>
            <DescriptionsItem label="手机号">{{ form.mobile }}</DescriptionsItem>
            <DescriptionsItem label="密码">{{ form.password }}</DescriptionsItem>
            <DescriptionsItem label="注册时间">{{ form.create_time }}</DescriptionsItem>
            <DescriptionsItem label="最后修改时间">{{ form.modify_time }}</DescriptionsItem>
            <DescriptionsItem label="头像">
                <Upload @completed="uploadCompleted" v-model:value="form.avatar" :uploadPath="adminUpdateAvatar"></Upload>
            </DescriptionsItem>
        </Descriptions>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, computed, ref } from 'vue'
    import { useStore } from 'vuex'
    import { Descriptions, DescriptionsItem } from 'ant-design-vue'
    import AdminModel from './config/model'
    import Upload from '@/components/customAnt/upload.vue'
    import * as storeTypes from '@/store/types'
    import urls from '@/http/urls'

    export default defineComponent({
        name: 'admin',
        components: {
            Descriptions,
            DescriptionsItem,
            Upload,
        },
        setup(props, ctx){
            const store = useStore()
            const form = computed( () => store.state.admin)
            const model = reactive<AdminModel>(new AdminModel())
            const adminUpdateAvatar = ref(urls.adminUpdateAvatar)

            const uploadCompleted = (path: string) => {
                store.dispatch(storeTypes.UPDATE_ADMIN)
            }

            return {
                adminUpdateAvatar,
                form,
                uploadCompleted,
            }
        },
    })
</script>
