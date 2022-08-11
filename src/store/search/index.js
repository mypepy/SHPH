import { reqSearchInfo } from "@/api";
//search模块的小仓库
const state={
    //仓库初始状态
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList;
    }
};
const actions={
    // 获取search模块数据
   async getSearchList({commit},params={}){
    // reqSearchInfo这个函数在调用服务器数据时，至少传递一个参数（空对象）
    //params形参：是当用户派发action时，第二个参数传递过来的   
     let result=await reqSearchInfo(params);
     if(result.code==200){
         commit('GETSEARCHLIST',result.data)
     }
    }
};
//简化数据，是组件获取数据更方便
const getters={
    //当前形参state,为当前仓库的state，并非大仓库的state
    
    goodsList(state){
        //如果没网，会返回一个undefined，不能遍历，所以要加个数组
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    },
   
};
export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}