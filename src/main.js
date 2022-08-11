import Vue from 'vue'
import App from './App.vue'
//三级联动组件-全局组件
import TypeNav from '@/components/TypeNav';
//轮播全局组件
import Carousel from '@/components/Carousel';
// 分页器全局组件
import Pagination from '@/components/Pagination';
import { Button,MessageBox} from 'element-ui';
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 注册全局组件
Vue.component(Button.name,Button)
// elementUI注册组件，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入MockServe.js--mock数据
import '@/mock/mockServe';
//引入swiper样式
import 'swiper/css/swiper.css';
//引入路由
import router from '@/router';
//引入仓库
import store from '@/store';
// 统一引入
import * as API from '@/api';
import dz from '@/assets/1.jpg'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:dz
});
// 引入表单校验插件
import '@/plugins/validate';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线$bus配置
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由：底下写法kv一致省略v
  router,
  //注册仓库:组件实例的身上会对一个属性$store
  store
}).$mount('#app')
