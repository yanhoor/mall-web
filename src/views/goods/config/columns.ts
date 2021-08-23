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
        dataIndex: 'category_list',
        key: 'category_list',
        customRender: ({ text, record, index}: any) => {
            const sl =  record.category_list.map((cate: {name: string}) => cate.name)
            return sl.join('/')
        }
    },
    {
        title: '标签',
        dataIndex: 'label_list',
        key: 'label_list',
        customRender: ({ text, record, index}: any) => {
            return record.label_list.map((label: {name: string, color: string}) => h(
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
