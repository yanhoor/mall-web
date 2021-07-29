<template>
    <div>
        <h3>商品分类管理</h3>
        <Button @click="onAddFirst">添加一级分类</Button>
        <Tree show-line :treeData="goodsModel.treeData" :replace-fields="{ key: 'id', title: 'name' }" :load-data="onLoadData">
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
    </div>
    <Modal v-model:visible="goodsModel.showEdit" :title="menuKey == 1 ? '修改分类名称' : '新增下级分类'" @ok="saveGoodsCate">
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
    import {defineComponent, reactive, computed, ref} from 'vue'
    import { useStore } from 'vuex'
    import GoodsCategoryModel from "./config/model"
    import { Tree, Button, Modal, Form, Input, FormItem, Dropdown, Menu, MenuItem, Row, Col } from 'ant-design-vue'

    export default defineComponent({
        name: 'shop-detail',
        components: {
            Tree,
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
            const goodsModel = reactive<GoodsCategoryModel>(new GoodsCategoryModel())
            const store = useStore()
            let editNode = ref() // 选中编辑的节点
            let menuKey = ref() // 选中的右键菜单
            let itemForm = goodsModel.itemForm

            const shopId = computed(() => store.state.admin.shop_id)

            goodsModel.initTreeData(shopId.value)

            const onAddFirst = () => {
                editNode.value = null
                goodsModel.itemForm = Object.assign(goodsModel.itemForm, goodsModel.initForm()) // todo: 不可以直接赋值
                goodsModel.showEdit = true
            }

            const saveGoodsCate = () => {
                itemForm.shop_id = shopId.value
                if(!itemForm.name){
                    goodsModel.$message.error('请输入分类名称')
                    return
                }
                goodsModel.saveForm().then( r => {
                    if(menuKey.value == 1){
                        editNode.value.name = r.data.name
                        return
                    }
                    if(!editNode.value){
                        goodsModel.treeData.push(r.data)
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
                        goodsModel.showEdit = true
                        break

                    case '2':
                        editNode.value = node
                        itemForm.parent_id = node.id
                        itemForm.name = ''
                        itemForm.level = node.level + 1
                        goodsModel.showEdit = true
                        break
                }
            }

            const onLoadData = (treeNode: any) => {
                return new Promise<void>((resolve, reject) => {
                    if (treeNode.dataRef.children) {
                        return resolve()
                    }
                    goodsModel.getCategoryChildren(shopId.value, treeNode.dataRef.id).then(r => {
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
                goodsModel,
                itemForm,
                editNode,
                menuKey,
                onAddFirst,
                saveGoodsCate,
                onContextMenuClick,
                onLoadData,
            }
        }
    })
</script>

<style lang="less" scoped>

</style>
