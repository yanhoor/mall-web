<template>
    <div class="detail_wrapper">
        <Row>
            <Col :span="8" v-if="shopId">
                <GoodsCategory></GoodsCategory>
            </Col>
            <Col :span="16">
                <Edit :model="model" :colSpan="24"></Edit>
            </Col>
        </Row>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch, ref, computed} from 'vue'
    import { useStore } from 'vuex'
    import Edit from './Edit.vue'
    import ShopModel from "@/views/shop/config/model"
    import { Card, Button, Row, Col } from 'ant-design-vue'
    import GoodsCategory from '../goodsCategory/Index.vue'

    export default defineComponent({
        name: 'shop-detail',
        components: {
            Edit,
            Card,
            Button,
            Row,
            Col,
            GoodsCategory,
        },
        setup(props, ctx){
            const model = reactive<ShopModel>(new ShopModel())
            const store = useStore()

            const shopId = computed(() => store.state.admin.shop_id)
            model.getCateList()
            if(shopId.value){
                model.getDetail(shopId.value)
            }

            return {
                model,
                shopId,
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
