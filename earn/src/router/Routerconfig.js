import Home from '../view/Home'
import Login from '../view/Login'
import Index from '../view/home/Index';
import Setting from '../view/home/Setting'
import Can from '../view/home/Can';
import Dk from '../view/order/Dk';
import Zk from '../view/order/Zk';
import Bx from '../view/order/Bx';
export const routes = [
    {
        path: "/",
        redirect: '/home'
    },
    {
        path: "/home",
        component: Home,
        children: [
            {
                path: "/home",
                redirect: "/home/index"
            },
            {
                path: "/home/index",
                component: Index,
            }, {
                path: "/home/setting",
                component: Setting,
            }, {
                path: "/home/order",
                component: Can,
                children: [{
                    path: '/home/order',
                    redirect: '/home/order/dk'
                }, {
                    path: '/home/order/dk',
                    component: Dk
                }, {
                    path: '/home/order/zk',
                    component: Zk
                }, {
                    path: '/home/order/bx',
                    component: Bx
                }]
            }
        ]
    },
    {
        path: "/login",
        component: Login,
    }
]