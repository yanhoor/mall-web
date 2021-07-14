<template>
    <div class="custom_table">
        <Table size="middle" :dataSource="dataSource" :rowKey="rowKey" :pagination="pagination" @change="handleTableChange">
            <TableColumn
                    v-for="column of resultColumns"
                    :key="column.key"
                    :custom-render="column.customRender"
                    :data-index="column.dataIndex"
                    :title="column.title">
                <template #default="{text, record, index}">
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

                    <!--序号-->
                    <span v-else-if="column.key === 'index'">{{ index + 1}}</span>

                    <!--普通数据-->
                    <span v-else>{{ text }}</span>
                </template>
            </TableColumn>
        </Table>
    </div>
</template>

<script lang="ts">
    import { Table, TableColumn, Button } from 'ant-design-vue'
    import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface';
    import { defineComponent, toRaw, computed } from 'vue'

    type Pagination = TableState['pagination'];

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
            },
            pagination: {
                type: Object,
                required: true
            },
        },
        components: {
            Table,
            TableColumn,
            Button,
        },
        setup(props: {columns: Array<any>}, ctx){
            const handleActionClick = (event: string, data: any) => {
                ctx.emit('actionClick', event, data)
            }

            const handleTableChange = (page: Pagination, filters: TableStateFilters, sorter: any) => {
                ctx.emit('tableChange', page, filters, sorter)
            }

            const resultColumns = computed(() => {
                const hasIndex = props.columns.some((column) => column.key === 'index')
                if(!hasIndex){
                    props.columns.unshift({
                        title: '#',
                        dataIndex: '',
                        key: 'index'
                    })
                }
                return props.columns
            })

            return {
                resultColumns,
                handleActionClick,
                handleTableChange,
            }
        }
    })
</script>
