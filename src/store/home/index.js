import { reqBannerList, reqCategoryList,reqFloorList } from "@/api";
//home模块的小仓库
const state = {
    //state中数据默认初始值【根据返回接口数据类型】
    //home三级菜单数据
    categoryList: [],
    //轮播图数据
    bannerList: [],
    //floor数据
    floorList:[]
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList;
    }
};
const actions = {
    //通过api里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }

    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result=await reqFloorList();
        if(result.code==200){
            commit('GETFLOORLIST',result.data);
        }
    },
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}