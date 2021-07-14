import {ColumnProps} from "ant-design-vue/es/table/interface";
import {h} from "vue";
import {Tag} from "ant-design-vue";


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
