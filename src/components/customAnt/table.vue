<template>
    <div class="custom_table">
        <Table :dataSource="dataSource" :rowKey="rowKey">
            <TableColumn
                    v-for="column of columns"
                    :key="column.key"
                    :data-index="column.dataIndex"
                    :title="column.title">
                <template #default="{text, record}">
                    <div v-if="column.key === 'action'">
                        <template v-for="action of column.actions">
                            <Button @click.stop="handleActionClick(action.event, record)" type="link">{{ action.title }}</Button>
                        </template>
                    </div>
                    <span v-else>{{ text }}</span>
                </template>
            </TableColumn>
        </Table>
    </div>
</template>

<script lang="ts">
    import { Table, TableColumn, Button } from 'ant-design-vue'
    import { defineComponent, toRaw } from 'vue'

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

            return {
                handleActionClick
            }
        }
    })
</script>
