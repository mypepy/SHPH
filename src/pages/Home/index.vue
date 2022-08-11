<template>
  <div>
    <!-- 三级联动全局组件，因此不需要在引入和注册 -->
    <TypeNav />
    <ListContainer />
    <Recommand />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"/>
    <Brand />
  </div>
</template>

<script>
//引入其他组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommand from "@/pages/Home/Recommand";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommand,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action,获取floor组件数据
    this.$store.dispatch("home/getFloorList");

  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style lang="less" scoped>
</style>