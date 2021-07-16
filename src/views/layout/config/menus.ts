import { PaperClipOutlined, TeamOutlined, TagOutlined, UserOutlined } from '@ant-design/icons-vue';

export default [
    {
        key: 'data_management',
        title: '数据管理',
        icon: PaperClipOutlined,
        children: [
            {
                key: 1,
                title: '用户管理',
                icon: TeamOutlined,
                path: '/user'
            },
            {
                key: 2,
                title: '用户标签',
                icon: TagOutlined,
                path: '/userLabel'
            },
        ],
    },
    {
        key: 3,
        title: '个人信息',
        icon: UserOutlined,
        path: '/admin'
    },
]
