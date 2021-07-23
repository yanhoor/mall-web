<template>
    <div class="detail_wrapper">
        <Row>
            <Col :span="6">
                <h3>商品分类管理</h3>
                <Button @click="onAddFirst">添加一级分类</Button>
                <Tree show-line :treeData="foodModel.treeData" :replace-fields="{ key: 'id', title: 'name' }" :load-data="onLoadData">
                    <template #title="{ dataRef }">
                        <Dropdown :trigger="['contextmenu']">
                            <span>{{ dataRef.name }}</span>
                            <template #overlay>
                                <Menu @click="({ key: menuKey }) => onContextMenuClick(menuKey, dataRef)">
                                    <a-menu-item key="1">修改名称</a-menu-item>
                                    <a-menu-item key="2">添加子分类</a-menu-item>
                                    <a-menu-item key="3">删除该分类及下级分类</a-menu-item>
                                </Menu>
                            </template>
                        </Dropdown>
                    </template>
                </Tree>
            </Col>
            <Col :span="12">
                <Edit :model="model" :colSpan="24"></Edit>
            </Col>
        </Row>
    </div>
    <Modal v-model:visible="foodModel.showEdit" :title="menuKey == 1 ? '修改分类名称' : '新增下级分类'" @ok="saveFoodCate">
        <Form :model="itemForm">
            <Form-item label="上级分类" v-if="menuKey == 2">
                <Input disabled :value="editNode?.name ?? '无'"/>
            </Form-item>
            <Form-item label="分类名称" name="name">
                <Input placeholder="请输入分类名称" v-model:value.trim="itemForm.name"/>
            </Form-item>
        </Form>
    </Modal>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch, ref} from 'vue'
    import { useStore } from 'vuex'
    import Edit from './Edit.vue'
    import ShopModel from "@/views/shop/config/model"
    import FoodCategoryModel from "@/views/shop/config/foodCategoryModel"
    import { Tree, Card, Button, Modal, Form, Input, FormItem, Dropdown, Menu, MenuItem, Row, Col } from 'ant-design-vue'
    import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'

    export default defineComponent({
        name: 'shop-detail',
        components: {
            Edit,
            Tree,
            Card,
            Button,
            Modal,
            Form,
            FormItem,
            Input,
            Dropdown,
            Menu,
            Row,
            Col,
            [MenuItem.name]: MenuItem,
        },
        setup(props, ctx){
            const model = reactive<ShopModel>(new ShopModel())
            const foodModel = reactive<FoodCategoryModel>(new FoodCategoryModel())
            const store = useStore()
            let editNode = ref() // 选中编辑的节点
            let menuKey = ref() // 选中的右键菜单
            let itemForm = foodModel.itemForm

            const shopId = store.state.admin.shop_id
            model.getCateList()
            if(shopId){
                model.getDetail(shopId)
            }

            foodModel.initTreeData(shopId)

            const onAddFirst = () => {
                editNode.value = null
                foodModel.itemForm = Object.assign(foodModel.itemForm, foodModel.initForm()) // todo: 不可以直接赋值
                console.log(foodModel.itemForm)
                console.log(itemForm)
                foodModel.showEdit = true
            }

            const saveFoodCate = () => {
                itemForm.shop_id = shopId
                if(!itemForm.name){
                    foodModel.$message.error('请输入分类名称')
                    return
                }
                foodModel.saveForm().then( r => {
                    if(menuKey.value == 1){
                        editNode.value.name = r.data.name
                        return
                    }
                    if(!editNode.value){
                        foodModel.treeData.push(r.data)
                    }else if(editNode.value.children){
                        editNode.value.children.push(r.data)
                    }else{
                        editNode.value.children = [r.data]
                    }
                })
            }

            const onContextMenuClick = (key: string, node: any) => {
                console.log('-----------node', node)
                menuKey.value = key
                switch(key){
                    case '1':
                        editNode.value = node
                        itemForm = Object.assign(itemForm, node)
                        foodModel.showEdit = true
                        break

                    case '2':
                        editNode.value = node
                        itemForm.parent_id = node.id
                        itemForm.name = ''
                        itemForm.level = node.level + 1
                        foodModel.showEdit = true
                        break
                }
            }

            const onLoadData = (treeNode: any) => {
                return new Promise<void>((resolve, reject) => {
                    if (treeNode.dataRef.children) {
                        return resolve()
                    }
                    foodModel.getCategoryChildren(shopId, treeNode.dataRef.id).then(r => {
                        if(r.success){
                            treeNode.dataRef.children = r.list
                            return resolve()
                        }
                        reject()
                    }).catch(e => {
                        reject()
                    })
                })
            }

            return {
                model,
                foodModel,
                itemForm,
                editNode,
                menuKey,
                onAddFirst,
                saveFoodCate,
                onContextMenuClick,
                onLoadData,
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
