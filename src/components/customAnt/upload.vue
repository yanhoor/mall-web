<template>
    <Upload :showUploadList="false" :customRequest="customRequest">
        <img :src="imgFullPath" alt="" v-if="imgPath" class="img_preview">
        <PlusOutlined v-else></PlusOutlined>
    </Upload>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue'
    import { Upload } from 'ant-design-vue'
    import { PlusOutlined } from '@ant-design/icons-vue'
    import $http from '@/http'
    import urls from '@/http/urls'

    interface FileItem {
        uid: string;
        name?: string;
        status?: string;
        response?: string;
        url?: string;
        type?: string;
        size: number;
        originFileObj: any;
    }

    interface Props{
        typeList: Array<string>
    }

    export default defineComponent({
        name: 'custom-upload',
        components: {
            Upload,
            PlusOutlined,
        },
        props: {
            typeList: {
                type: Array,
                default(){
                    return ['.jpg', '.jpeg', '.png', '.gif']
                }
            },
            imgPath: {
                type: String,
                default: ''
            },
            uploadPath: {
                type: String,
                required: true
            },
        },
        emit: ['completed'],
        setup(props: any, ctx){
            const imgFullPath = computed(() => {
                return urls.IMG_HOST + props.imgPath
            })

            const beforeUpload = (file: FileItem, fileList?: Array<FileItem>) => {
                const ldx = file.name?.lastIndexOf('.')
                const ext = file.name?.substring(ldx as number)
                return props.typeList.includes(ext as string)
            }

            const customRequest = (prop: any) => {
                const { file } = prop
                if(beforeUpload(file)){
                    $http.fetch(props.uploadPath, { file }, { formData: true }).then(r => {
                        if(r.success){
                            ctx.emit('completed', r.path)
                        }
                    })
                }
            }

            return {
                imgFullPath,
                beforeUpload,
                customRequest,
            }
        }
    })
</script>

<style lang="less" scoped>
    .img_preview{
        width: 120px;
        max-height: 120px;
    }
</style>
