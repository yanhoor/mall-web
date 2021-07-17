<template>
    <div class="custom_table" ref="tableContainerRef">
        <Table size="middle" :scroll="{y: tableScrollHeight}"  :dataSource="dataSource" :rowKey="rowKey" :pagination="model.pagination" @change="handleTableChange">
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
    import { defineComponent, ref, computed, onMounted, nextTick, watch } from 'vue'
    import ListFetchModel from "@/model/list_fetch_model";

    type Pagination = TableState['pagination'];

    interface Props{
        columns: Array<any>,
        model: any,
        dataSource: Array<any>
    }

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
            model: {
                type: Object,
                validator(value){
                    return value instanceof ListFetchModel
                },
                required: true
            },
        },
        components: {
            Table,
            TableColumn,
            Button,
        },
        setup(props: Props, ctx){
            const tableContainerRef = ref()
            const tableScrollHeight = ref()

            const handleActionClick = (event: string, data: any) => {
                ctx.emit('actionClick', event, data)
            }

            const handleTableChange = (page: Pagination, filters: TableStateFilters, sorter: any) => {
                ctx.emit('tableChange', page, filters, sorter)
                props.model.pagination.current = page?.current
                props.model.pagination.pageSize = page?.pageSize
                props.model.getListData()
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

            const adjustTable = async () => {
                const rh = document.querySelector('#layoutRight')?.clientHeight as number
                const dh = document.documentElement.clientHeight
                if(tableContainerRef.value){
                    const offset = tableContainerRef.value.getBoundingClientRect()
                    if(rh > dh){
                        tableScrollHeight.value = offset.height - (rh - dh) - 110
                    }else{
                        tableScrollHeight.value = rh - offset.top - 150
                    }
                }
            }

            watch(() => props.dataSource, (v) => {
                if(v.length > 0){
                    adjustTable()
                }
            }, { deep: true, flush: 'post' })

            onMounted(() => {
                window.addEventListener('resize', adjustTable)
            })

            return {
                tableContainerRef,
                tableScrollHeight,
                resultColumns,
                handleActionClick,
                handleTableChange,
            }
        }
    })
</script>
