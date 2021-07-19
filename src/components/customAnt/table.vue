
<!--
todo: scroll 和 expandedRowRender 一起用报错？
注意：
1. 在 columns 里自定义渲染，需要有 customRender，返回文本或 Vue 的 h() 函数
2. 可展开行：传入 props: expanded，使用 expand 命名插槽


事件：
1. actionClick：点击操作栏按钮触发，需要在columns里配置key: 'action' 和 action 数组
    {
        title: '操作',
        key: 'action',
        actions: [
            {title: '编辑', event: 'edit'}
        ]
    }

2. tableChange：表格原有的 change 事件
-->

<template>
    <div class="custom_table" ref="tableContainerRef">
        <Table
                size="middle"
                :scroll="{y: tableScrollHeight}"
                :dataSource="dataSource"
                :rowKey="rowKey"
                :pagination="model.pagination"
                @change="handleTableChange"
                :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
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

                    <!--序号-->
                    <span v-else-if="column.key === 'index'">{{ index + 1}}</span>

                    <!--普通数据-->
                    <span v-else>{{ text }}</span>
                </template>
            </TableColumn>
            <template #expandedRowRender="{ record }" v-if="expanded">
                <slot name="expand" :record="record"></slot>
            </template>
        </Table>
    </div>
</template>

<script lang="ts">
    import { Table, TableColumn, Button } from 'ant-design-vue'
    import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface';
    import { defineComponent, ref, computed, onMounted, nextTick, watch } from 'vue'
    import ListFetchModel from "@/model/list_fetch_model";
    import { debounce } from 'lodash'

    type Pagination = TableState['pagination'];

    interface Props{
        columns: Array<any>,
        model: any,
        dataSource: Array<any>,
        expanded: boolean,
    }

    export default defineComponent({
        name: 'custom-table',
        props: {
            // 列表数据
            dataSource: {
                type: Array,
                default(){
                    return []
                }
            },
            // 列配置
            columns: {
                type: Array,
                default(){
                    return []
                }
            },
            // 行数据key
            rowKey: {
                type: String,
                default: 'id'
            },
            // 行展开
            expanded: {
                type: Boolean,
                default: false
            },
            // 页面model
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

            const adjustTable = debounce(async () => {
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
            }, 20)

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

<style lang="less" scoped>
    :deep(.table-striped) {
        background-color: #fafafa;
    }
</style>
