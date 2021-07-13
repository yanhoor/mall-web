<template>
    <div class="custom_table">
        <Table :dataSource="dataSource" :rowKey="rowKey">
            <TableColumn
                    v-for="column of columns"
                    :key="column.key"
                    :custom-render="column.customRender"
                    :data-index="column.dataIndex"
                    :title="column.title">
                <template #default="{text, record}">
                    <!--操作栏-->
                    <div v-if="column.key === 'action'">
                        <template v-for="action of column.actions">
                            <Button @click.stop="handleActionClick(action.event, record)" type="link">{{ action.title }}</Button>
                        </template>
                    </div>
                    <!--自定义渲染函数-->
                    <div v-else-if="column.key === 'render'">
                        <template v-for="action of column.actions">
                            <Button @click.stop="handleActionClick(action.event, record)" type="link">{{ action.title }}</Button>
                        </template>
                    </div>
                    <!--普通数据-->
                    <span v-else>{{ text }}</span>
                </template>
            </TableColumn>
        </Table>
    </div>
</template>

<script lang="ts">
    import { Table, TableColumn, Button } from 'ant-design-vue'
    import { defineComponent, toRaw, computed } from 'vue'

    export default defineComponent({
        name: 'custom-table',
        props: {
            dataSource: {
                type: Array,
                default(){
                    return []
                }
            },
            columns: {
                type: Array,
                default(){
                    return []
                }
            },
            rowKey: {
                type: String,
                default: 'id'
            }
        },
        components: {
            Table,
            TableColumn,
            Button,
        },
        setup(props, ctx){
            const handleActionClick = (event: string, data: any) => {
                ctx.emit('actionClick', event, data)
            }

            console.log('==================', props)

            // const resultColumns = computed(() => {
            //     return props.columns.unshift({})
            // })

            return {
                handleActionClick
            }
        }
    })
</script>
