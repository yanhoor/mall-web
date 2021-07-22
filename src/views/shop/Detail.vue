<template>
    <div class="detail_wrapper">
        <Edit :model="model" :colSpan="12"></Edit>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch, ref} from 'vue'
    import { useStore } from 'vuex'
    import Edit from './Edit.vue'
    import ShopModel from "@/views/shop/config/model"
    import { Tree } from 'ant-design-vue'

    export default defineComponent({
        name: 'shop-detail',
        components: {
            Edit,
            Tree,
        },
        setup(props, ctx){
            const model = reactive<ShopModel>(new ShopModel())
            const store = useStore()

            const shopId = store.state.admin.shop_id
            model.getCateList()
            if(shopId){
                model.getDetail(shopId)
            }


            return {
                model,
            }
        }
    })
</script>

<style lang="less" scoped>
    .detail_wrapper{
        width: 80%;
        max-height: calc(100vh - 150px);
        margin: 0 auto;
        overflow: auto;
    }
</style>
