import {ColumnProps} from "ant-design-vue/es/table/interface";


export default <ColumnProps>[
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile'
    },
    {
        title: '操作',
        key: 'action',
        actions: [
            {title: '编辑', event: 'edit'}
        ]
    }
]
