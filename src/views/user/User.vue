<template>
    <div class="page_container">
        <Button @click="model.showEdit = !model.showEdit">编辑</Button>
    </div>
    <Drawer v-model:visible="model.showEdit" width="700" @close="model.closeEdit()">
        <Edit></Edit>
    </Drawer>
</template>

<script lang="ts">
    import {defineComponent, reactive} from 'vue'
    import { Form, Input, Drawer, Row, Col, Button, Table } from 'ant-design-vue'
    import UserModel from "@/views/user/config/model";
    import Edit from './edit.vue'

    export default defineComponent({
        name: 'user',
        components: {
            Edit,
            Table,
            Drawer,
        },
        setup(){
            let model = reactive<UserModel>(new UserModel())
            model.initData()

            return {
                model,
            }
        }
    })
</script>
