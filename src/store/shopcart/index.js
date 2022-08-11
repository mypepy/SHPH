import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 修改购物车某一产品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 删除全选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context:小仓库，commit,getters,dispatch,state
        // 获取购物车中全部商品
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : "";
            //将每次返回的promise添加到数组中
            promiseAll.push(promise);
        });
        // 只有全部的p1|p2|p3都成功，返回结果即为成功，有一个失败，返回结果为失败
        return Promise.all(promiseAll);
    },
    // 修改产品全选状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        // 最终返回结果
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
};
export default {
    state,
    actions,
    mutations,
    getters
}