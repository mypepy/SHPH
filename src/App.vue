<template>
  <div id="app">
   <Header></Header>
   <!-- 路由组件出口的地方 -->
   <router-view></router-view>
   <!-- 在Home，Search显示，在登录和注册隐藏 -->
   <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted(){
    //派发一个action获取三级列表的数据(仅执行第一次)
    this.$store.dispatch("home/categoryList");
  }
}
</script>

<style>

</style>
