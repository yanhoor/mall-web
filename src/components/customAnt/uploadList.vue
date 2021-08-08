<template>
    <div>
        <Upload list-type="picture-card" :customRequest="customRequest" :fileList="completedFileList" @preview="handlePreview" :remove="removeFile" accept="image/*">
            <div v-if="fileList.length <= maxCount">
                <plus-outlined />
                <div class="ant-upload-text">点击上传</div>
            </div>
        </Upload>
        <Modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </Modal>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, ref } from 'vue'
    import { Upload, Modal, message } from 'ant-design-vue'
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
        preview?: string;
    }

    interface Props{
        typeList: Array<string>,
        fileList: string[],
        uploadPath: string,
        maxCount: number,
    }

    export default defineComponent({
        name: 'custom-upload-list',
        components: {
            Upload,
            Modal,
            PlusOutlined,
        },
        props: {
            typeList: {
                type: Array,
                default(){
                    return ['.jpg', '.jpeg', '.png', '.gif']
                }
            },
            fileList: {
                type: Array,
                default(){
                    return []
                }
            },
            uploadPath: {
                type: String,
                default: '/file/upload'
            },
            maxCount: {
                type: Number,
                default: 5
            },
        },
        emit: ['update:fileList'],
        setup(props: any, ctx){
            const previewVisible = ref(false)
            const previewImage = ref<string | undefined>('')

            const completedFileList = computed<FileItem[]>(() => {
                return props.fileList.map((path: string, index: number) => {
                    return {
                        uid: index,
                        url: urls.IMG_HOST + path
                    }
                })
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
                            let l = props.fileList
                            l.push(r.path)
                            ctx.emit('update:fileList', l)
                        }
                    })
                }
            }

            // 移除文件
            const removeFile = (file: FileItem) => {
                return new Promise((resolve, reject) => {
                    if(file.url){
                        const index = file.url.lastIndexOf('/upload/')
                        const path = file.url.substring(index + 8)
                        $http.fetch('/file/delete', { path }).then(r => {
                            if(r.success){
                                let l = props.fileList
                                const idx = l.indexOf(path)
                                l.splice(idx, 1)
                                ctx.emit('update:fileList', l)
                                message.success(r.msg)
                                return resolve(true)
                            }else{
                                return reject()
                            }
                        })
                    }else{
                        return reject()
                    }
                })
            }

            const handleCancel = () => {
                previewVisible.value = false
            }

            const handlePreview = async (file: FileItem) => {
                previewImage.value = file.url
                previewVisible.value = true
            }

            return {
                previewVisible,
                previewImage,
                completedFileList,
                beforeUpload,
                customRequest,
                removeFile,
                handleCancel,
                handlePreview,
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
