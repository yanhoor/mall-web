<template>
    <Upload :showUploadList="false" :customRequest="customRequest" accept="image/*">
        <Tooltip v-if="value" title="点击修改">
            <img :src="imgFullPath" alt="" class="img_preview">
        </Tooltip>
        <div v-else class="upload_action">
            <PlusOutlined style="font-size: 36px;"></PlusOutlined>
            <p>点击上传</p>
        </div>
    </Upload>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue'
    import { Upload, Tooltip } from 'ant-design-vue'
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
        typeList: Array<string>,
        value: string,
        uploadPath: string,
    }

    export default defineComponent({
        name: 'custom-upload',
        components: {
            Upload,
            Tooltip,
            PlusOutlined,
        },
        props: {
            typeList: {
                type: Array,
                default(){
                    return ['.jpg', '.jpeg', '.png', '.gif']
                }
            },
            value: {
                type: String,
                default: ''
            },
            uploadPath: {
                type: String,
                default: '/file/upload'
            },
        },
        emit: ['completed', 'update:value'],
        setup(props: any, ctx){
            const imgFullPath = computed(() => {
                return urls.IMG_HOST + props.value
            })

            const beforeUpload = (file: FileItem, fileList?: Array<FileItem>) => {
                const ldx = file.name?.lastIndexOf('.')
                const ext = file.name?.substring(ldx as number)
                return props.typeList.includes(ext as string)
            }

            const customRequest = (prop: any) => {
                const { file } = prop
                if(beforeUpload(file)){
                    $http.fetch(props.uploadPath, { file, lastFilePath: props.value }, { formData: true }).then(r => {
                        if(r.success){
                            ctx.emit('completed', r.path)
                            ctx.emit('update:value', r.path)
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
        width: 128px;
        max-height: 128px;
    }
    .upload_action{
        width: 128px;
        height: 128px;
        border: 1px dashed #dedede;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #999;
        >p{
            text-align: center;
            margin-top: 10px;
        }
    }
</style>
