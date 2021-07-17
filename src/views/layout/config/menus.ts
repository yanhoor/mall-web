import { PaperClipOutlined, TeamOutlined, TagOutlined, UserOutlined, ShopOutlined } from '@ant-design/icons-vue';

export default [
    {
        key: 'data_management',
        title: '数据管理',
        icon: PaperClipOutlined,
        children: [
            {
                key: 1,
                title: '用户数据',
                icon: TeamOutlined,
                children: [
                    {
                        key: 2,
                        title: '用户管理',
                        icon: TeamOutlined,
                        path: '/user'
                    },
                    {
                        key: 3,
                        title: '用户标签',
                        icon: TagOutlined,
                        path: '/userLabel'
                    },
                ]
            },
            {
                key: 5,
                title: '商铺管理',
                icon: ShopOutlined,
                path: '/shop'
            },
        ],
    },
    {
        key: 4,
        title: '个人信息',
        icon: UserOutlined,
        path: '/admin'
    },
]
