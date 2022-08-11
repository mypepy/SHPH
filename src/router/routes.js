// 路由配置信息
//引入路由组件
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import ShopCart from '@/pages/ShopCart'
import AddCartSuccess from '@/pages/AddCartSuccess'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default
    //配置路由
    [
        {
            path: "/home",
            // 路由懒加载
            component:()=>import('@/pages/Home'),
            meta: { show: true }
        },
        {
            path: "/search/:keyword?",
            component:()=>import('@/pages/Search'),
            meta: { show: true },
            name: 'search'
        },
        {
            path: "/login",
            component: Login,
            meta: { show: false }
        },
        {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        {
            path: "/detail/:skuid",
            component: Detail,
            meta: { show: true }
        },
        {
            path: "/addcartsuccess",
            name: 'addcartsuccess',
            component: AddCartSuccess,
            meta: { show: true }
        },
        {
            path: "/shopcart",
            component: ShopCart,
            meta: { show: true }
        },
        {
            path: "/trade",
            component: Trade,
            meta: { show: true },
            // 路由独享守卫
            beforeEnter: (to, from, next) => {
                // 去交易页，必须从购物车来
                if (from.path == '/shopcart') {
                    next();
                } else {
                    // 从其他页来原地不动
                    next(false);
                }
            }
        },
        {
            path: "/pay",
            component: Pay,
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                // 去支付页，必须从交易来
                if (from.path == '/trade') {
                    next();
                } else {
                    // 从其他页来原地不动
                    next(false);
                }
            }
        },
        {
            path: "/paysuccess",
            component: PaySuccess,
            meta: { show: true },
        },
        {
            path: "/center",
            component: Center,
            meta: { show: true },
            // 二级路由组件
            children:
                [{
                    path: 'myorder',
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder
                },
                {
                    path: '/center',
                    redirect: "/center/myorder"
                }
                ]
        },
        //重定向，在项目跑起来的时候，默认定向到首页
        {
            path: '*',
            redirect: "/home"
        }
    ]
