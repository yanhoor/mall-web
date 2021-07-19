import {ColumnProps} from "ant-design-vue/es/table/interface";
import {h} from "vue";

export default <ColumnProps>[
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '联系电话',
        dataIndex: 'contract',
        key: 'contract'
    },
    {
        title: '所属分类',
        dataIndex: 'category',
        key: 'category',
        customRender: ({ text, record, index}: any) => {
            return record.category.map((label: {name: string}) => h(
                'span',
                [label.name]
            ))
        }
    },
    {
        title: '简介',
        dataIndex: 'desc',
        key: 'desc'
    },
    {
        title: '地址',
        dataIndex: 'headAddress',
        key: 'headAddress',
        customRender: ({ text, record, index}: any) => {
            return record.headAddress + record.tailAddress
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
