import {ColumnProps} from "ant-design-vue/es/table/interface";
import {h} from "vue";
import {Tag} from "ant-design-vue";
import urls from "@/http/urls";


export default <ColumnProps>[
    {
        title: '配置名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '图标',
        dataIndex: 'logo',
        key: 'logo',
        customRender: ({ text, record, index}: any) => {
            return h(
                'img',
                {
                    src: urls.IMG_HOST + record.logo,
                    style: 'max-width: 50px; height: 50px'
                },
                []
            )
        }
    },
    {
        title: '浮层',
        dataIndex: 'float_icon',
        key: 'float_icon',
        customRender: ({ text, record, index}: any) => {
            return h(
                'img',
                {
                    src: urls.IMG_HOST + record.float_icon,
                    style: 'max-width: 50px; height: 50px'
                },
                []
            )
        }
    },
    {
        title: '浮层指向链接',
        dataIndex: 'float_icon_link',
        key: 'float_icon_link'
    },
    {
        title: '浮层有效时间',
        dataIndex: 'float_valid_time_range',
        key: 'float_valid_time_range',
        width: '300',
        customRender: ({ text, record, index}: any) => {
            return record.float_valid_time_range.length ? record.float_valid_time_range.join(' 至 ') : '/'
        }
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        customRender: ({ text, record, index}: any) => {
            return h(
                Tag,
                {
                    color: record.state === 1 ? "green" : 'grey'
                },
                { default: () => ([record.state === 1 ? "启用" : '禁用'])}
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
