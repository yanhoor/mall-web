import {ColumnProps} from "ant-design-vue/es/table/interface";
import { Tag } from 'ant-design-vue'
import { h } from 'vue'

export default <ColumnProps>[
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '颜色',
        dataIndex: 'color',
        key: 'color',
        customRender: ({ text, record, index}: any) => {
            return h(
                Tag,
                {
                    color: text,
                },
                {
                    default(){
                        return [text]
                    }
                }
            )
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
