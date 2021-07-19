<template>
    <div class="picker_container">
        <Input disabled v-model:value="addressName">
        </Input>
        <Cascader
                :field-names="{ label: 'fullname', value: 'id' }"
                :loadData="loadData"
                :options="options"
                :value="codeList"
                @update:value="onCodeSelectUpdate"
                @change="onChange"
                change-on-select>
            <Button>
                <template #icon> <EditOutlined /> </template>
            </Button>
        </Cascader>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from 'vue'
    import { Cascader, Input, Button } from 'ant-design-vue'
    import { EditOutlined } from '@ant-design/icons-vue'
    import $http from '@/http'
    import urls from '@/http/urls'

    interface Option{
        fullname: string,
        id: string,
        location: {
            lat: number,
            lng: number
        },
        name: string,
        pinyin: string[],
        children?: Option[],
        loading?: boolean,
        isLeaf?: boolean,
        level: number,
    }

    export default defineComponent({
        name: 'custom-address-picker',
        components: {
            Cascader,
            Input,
            Button,
            EditOutlined,
        },
        props: {
            addressName: {
                type: String,
                default: ''
            },
            codeList: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        emits: ['update:addressName', 'update:codeList'],
        setup(props, ctx){
            const options = ref<Option[]>([])

            const onChange = (value: string, selectedOptions: Option[]) => {
                const r = selectedOptions.map(o => o.fullname).join('')
                const c = selectedOptions.map(o => o.id)
                ctx.emit('update:addressName', r)
                ctx.emit('update:codeList', c)
            };

            const fetchChildren = async (id = '') => {
                return $http.fetch(urls.addressChildren, { parentCode: id }, { method: 'get' })
            }

            const initData = async () => {
                const d = await fetchChildren()
                options.value = d.result[0].map((item: any) => {
                    item.level = 1
                    item.isLeaf = false
                    return item
                })
            }

            const loadData = async (selectedOptions: Option[]) => {
                const targetOption = selectedOptions[selectedOptions.length - 1];
                targetOption.loading = true
                const d = await fetchChildren(targetOption.id)
                const list = d.result[0]
                if(targetOption.level != 3){
                    targetOption.children = list.map((item: any) => {
                        item.level = targetOption.level + 1
                        item.isLeaf = item.level === 3
                        return item
                    })
                }
                targetOption.loading = false
            }

            const onCodeSelectUpdate = (codeList: string[]) => {
                ctx.emit('update:codeList', codeList)
            }

            initData()

            return {
                options,
                loadData,
                onChange,
                onCodeSelectUpdate,
            }
        }
    })
</script>

<style lang="less" scoped>
    .picker_container{
        display: flex;
        :deep(.ant-input){
            width: 90%;
        }
    }
</style>
