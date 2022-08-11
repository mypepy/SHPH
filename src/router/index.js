//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

//使用插件
Vue.use(VueRouter);
// 引入 store
import store from '@/store';


//备份VueRouter原型对象的push
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一个参数：告诉原来的push方法，你往哪跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call||app
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：传递参数：call传递参数使用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的这个y=0，代表滚动条在最上方
        return { y: 0 };
    },


});

// 全局守卫，前置守卫（路由跳转之前判断）
router.beforeEach(async (to, from, next) => {
    // to:可以获取要跳转到哪个路由的信息
    // from：可以获取到从哪来的路由的信息
    // next：放行函数 next()放行 next(path)放行到指令路由 next(false)
    // 如果有token，那就一定是登陆了
    let token = store.state.user.token;
    // 用户姓名
    let name = store.state.user.userInfo.name;
    if (token) {
        // 登录了就不让去登录了
        if (to.path == '/login') {
            next('/home')
        }
        //    如果去除了登录的其他路由组件
        else {
            // 如果有用户名
            if (name) {
                next();
            } else {
                try {
                    // 如果刷新页面用户信息小时，派发action让仓库存储用户信息在跳转
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token过期（失效）,获取不到用户
                    // 清除token,回到登录
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录:不能去交易相关,不能去支付相关【pay|paysuccess】,不能去个人中心
        // 未登录去那些----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把想去未去成的路由放在地址栏
            next('/login?redirect=' + toPath)
        } else {
            // 不是去那些---放行
            next()
        }

    }
});
export default router;