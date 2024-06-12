import { lazy } from 'react'
const routes = [
    {
        path: '/',
        name: '首页',
        isAuth: true,
        element: lazy(() => import('../views/HomeView'))
    },
    {
        path: '/user',
        name: '个人中心',
        isAuth: true,
        element: lazy(() => import('../views/UserView'))
    },
    {
        path: '/account',
        name: '重置密码',
        isAuth: false,
        element: lazy(() => import('../views/AccountView'))
    },
    {
        path: '/info',
        name: '信息',
        isAuth: false,
        element: lazy(() => import('../views/InfoView'))
    },
    {
        path: '/detail/:id',
        name: '账单详情',
        isAuth: true,
        element: lazy(() => import('../views/DetailView'))
    }
];

export default routes;
