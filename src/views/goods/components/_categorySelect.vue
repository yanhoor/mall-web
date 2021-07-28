<template>
    <div>
        <Cascader
                :field-names="{ label: 'name', value: 'id' }"
                :loadData="loadData"
                :options="options"
                :value="idList"
                @update:value="onSelectUpdate"
                @change="onChange"
                change-on-select>
        </Cascader>
    </div>
</template>

<script lang="ts">
    import {computed, defineComponent, reactive, ref} from 'vue'
    import { Cascader } from 'ant-design-vue'
    import { useStore } from 'vuex'
    import $http from '@/http'
    import urls from '@/http/urls'

    interface Option{
        id: string,
        name: string,
        children?: Option[],
        loading?: boolean,
        isLeaf?: boolean,
        level: number,
    }

    export default defineComponent({
        name: 'goods-category-select',
        components: {
            Cascader,
        },
        props: {
            idList: {
                type: Array,
                required: true
            }
        },
        emits: ['update:idList'],
        setup(props, ctx){
            const itemList = ref([])
            const options = ref<Option[]>([])

            const store = useStore()
            const shopId = computed(() => store.state.admin.shop_id)

            const fetchChildren = (parent_id: string = '0') => {
                return $http.fetch(urls.goodsCategoryChildren, { shop_id: shopId.value, parent_id }, { method: 'get' }).then(r => {
                    if(r.success){
                        return r.list
                    }
                })
            }

            const loadData = async (selectedOptions: Option[]) => {
                const targetOption = selectedOptions[selectedOptions.length - 1];
                targetOption.loading = true
                const list = await fetchChildren(targetOption.id)
                if(!list.length){
                    targetOption.isLeaf = true
                }else if(targetOption.level != 3){
                    targetOption.children = list.map((item: any) => {
                        item.level = targetOption.level + 1
                        item.isLeaf = item.level === 3
                        return item
                    })
                }
                targetOption.loading = false
            }

            const initData = async () => {
                const d = await fetchChildren()
                options.value = d.map((item: any) => {
                    item.level = 1
                    item.isLeaf = false
                    return item
                })
            }

            const onChange = (value: string, selectedOptions: Option[]) => {
                const c = selectedOptions.map(o => o.id)
                ctx.emit('update:idList', c)
            }

            const onSelectUpdate = (idList: string[]) => {
                ctx.emit('update:idList', idList)
            }

            initData()

            return {
                itemList,
                options,
                loadData,
                onChange,
                onSelectUpdate,
            }
        }
    })
</script>
