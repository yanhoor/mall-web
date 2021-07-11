<template>
    <div class="page_container">
        <Button @click="addUser">新增</Button>
        <Table :columns="columns" :data-source="model.pageList" @actionClick="handleAction"></Table>
    </div>
    <Drawer v-model:visible="model.showEdit" width="700" @close="model.closeEdit()">
        <Edit :model="model"></Edit>
    </Drawer>
</template>

<script lang="ts">
    import {defineComponent, reactive, provide, isReactive, isRef} from 'vue'
    import { Form, Input, Drawer, Row, Col, Button } from 'ant-design-vue'
    import Table from '@/components/customAnt/table.vue'
    import UserModel from "@/views/user/config/model";
    import Edit from './edit.vue'
    import columns from "./config/columns";

    export default defineComponent({
        name: 'user',
        components: {
            Edit,
            Table,
            Button,
            Drawer,
        },
        setup(){
            let model = reactive<UserModel>(new UserModel())
            model.initData()

            const handleAction = (type: string, data: any) => {
                model.showEdit = true
                model.userForm = Object.assign(model.userForm, data) // todo: 不可以直接赋值
            }

            const addUser = () => {
                model.showEdit = true
                model.userForm = Object.assign(model.userForm, model.initForm())
            }

            return {
                model,
                columns,
                handleAction,
                addUser,
            }
        }
    })
</script>
