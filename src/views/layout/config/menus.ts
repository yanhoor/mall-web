import { PaperClipOutlined, TeamOutlined, TagOutlined, UserOutlined, ShopOutlined, PartitionOutlined } from '@ant-design/icons-vue';

export default [
    {
        key: 'data_management',
        title: '数据管理',
        icon: PaperClipOutlined,
        children: [
            {
                key: 12,
                title: '管理员列表',
                icon: TeamOutlined,
                path: '/admin'
            },
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
                title: '店铺数据',
                icon: ShopOutlined,
                children: [
                    {
                        key: 6,
                        title: '店铺列表',
                        icon: ShopOutlined,
                        path: '/shop',
                    },
                    {
                        key: 8,
                        title: '店铺管理',
                        icon: ShopOutlined,
                        path: '/shopDetail',
                    },
                    {
                        key: 7,
                        title: '店铺分类',
                        icon: PartitionOutlined,
                        path: '/shopCategory',
                    },
                ]
            },
            {
                key: 9,
                title: '商品数据',
                icon: TeamOutlined,
                children: [
                    {
                        key: 10,
                        title: '商品管理',
                        icon: TeamOutlined,
                        path: '/goods'
                    },
                    {
                        key: 11,
                        title: '商品标签',
                        icon: TagOutlined,
                        path: '/goodsLabel'
                    },
                ]
            },
        ],
    },
    {
        key: 4,
        title: '个人信息',
        icon: UserOutlined,
        path: '/me'
    },
]
