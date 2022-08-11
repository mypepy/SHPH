import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份模块uuid--生成一个随机字符串
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车的action
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //  加入购物车返回的解构
        // 服务器写入数据成功，并没有返回其他参数，只返回code=200，代表这次操作成功
        // 因为服务器没有返回其他数据，因此不需要三连环
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 代表服务器加入购物车成功
        if (result.code == 200) {
            return "ok";
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }  
    },
};
const getters = {
    // 路劲导航简化的数据
    categoryView(state) {
        // state中goodinfo初始状态为空对象，空对象的categoryView的属性值为undefined
        // 取空对象则不会报错
        return state.goodInfo.categoryView || {};
    },
    // 产品信息简化的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性简化数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}