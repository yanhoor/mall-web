import {ColumnProps} from "ant-design-vue/es/table/interface";
import {h} from "vue";
import urls from '@/http/urls'

export default <ColumnProps>[
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
        customRender: ({ text, record, index}: any) => {
            return h(
                'img',
                {
                    src: urls.IMG_HOST + record.icon,
                    style: 'max-width: 50px; height: 50px'
                },
                []
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
