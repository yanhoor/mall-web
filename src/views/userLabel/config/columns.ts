import {ColumnProps} from "ant-design-vue/es/table/interface";


export default <ColumnProps>[
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '颜色',
        dataIndex: 'color',
        key: 'color'
    },
    {
        title: '操作',
        key: 'action',
        actions: [
            {title: '编辑', event: 'edit'}
        ]
    }
]
