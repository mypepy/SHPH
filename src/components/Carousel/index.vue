<template>
    <div class="swiper-container" ref="cur">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(carousel, index) in list"
              :key="carousel.id"
            >
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
    name:"Carousel",
    props:['list'],
     watch: {
    //监听bannerList数据的变化：有空数组变为四个元素
    list: {
      immediate:true,
      handler(newValue, oldValue) {
        //如果执行handler方法，说明bannerList已经填充了数据，但v-for仍不确实是否执行完毕
        //v-for执行完毕，才有结构
        this.$nextTick(() => {
          //此时服务器数据已返回，v-for执行完毕，轮播图结构也有了
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球也切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
   
}
</script>

<style lang="less" scoped>

</style>