import {ColumnProps} from "ant-design-vue/es/table/interface";
import {h} from "vue";
import {Tag} from "ant-design-vue";


export default <ColumnProps>[
    {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc'
    },
    {
        title: '所属分类',
        dataIndex: 'category_id',
        key: 'category_id',
        customRender: ({ text, record, index}: any) => {
            const sl =  record.category.map((cate: {name: string}) => cate.name)
            return sl.join('/')
        }
    },
    {
        title: '标签',
        dataIndex: 'labelList',
        key: 'labelList',
        customRender: ({ text, record, index}: any) => {
            return record.labelList.map((label: {name: string, color: string}) => h(
                Tag,
                {
                    color: label.color,
                },
                {
                    default(){
                        return [label.name]
                    }
                }
            ))
        }
    },
    {
        title: '操作',
        key: 'action',
        actions: [
            {title: '编辑', event: 'edit'}
        ]
    }
]
