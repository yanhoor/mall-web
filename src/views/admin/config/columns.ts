import {ColumnProps} from "ant-design-vue/es/table/interface"
import { Tag } from 'ant-design-vue'
import {h} from "vue";
import urls from '@/http/urls'

export default <ColumnProps>[
    {
        title: '用户名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile'
    },
    {
        title: '权限类型',
        dataIndex: 'type',
        key: 'type',
        customRender: ({ text, record, index}: any) => {
            let r = ''
            switch (record.type) {
                case 1:
                    r = '超级管理员'
                    break
                default:
                case 2:
                    r = '店铺管理员'
                    break
            }
            return r
        }
    },
    {
        title: '用户状态',
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
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        customRender: ({ text, record, index}: any) => {
            return record.avatar ? h(
                'img',
                {
                    src: urls.IMG_HOST + record.avatar,
                    style: 'max-width: 50px; height: 50px'
                },
                []
            ) : '/'
        }
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time'
    },
    {
        title: '操作',
        key: 'action',
        actions: [
            {
                title: '禁用',
                event: 'disabled',
                checkDisabled({text, record, index}: any){
                    return record.type === 1
                },
                checkShow({text, record, index}: any){
                    return record.state === 1
                }
            },
            {
                title: '启用',
                event: 'enable',
                checkDisabled({text, record, index}: any){
                    return record.type === 1
                },
                checkShow({text, record, index}: any){
                    return record.state === 2
                }
            },
        ]
    }
]
