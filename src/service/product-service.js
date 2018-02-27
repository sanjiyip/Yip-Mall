/*
 * @Author: yip 
 * @Date: 2018-02-07 19:53:55 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-27 12:31:47
 */
/* 下面的方法都是封装好的 ajax 请求 */
import _mm from 'util/_mm.js';

const _product = {
  // 获取商品列表信息
  getProductList(listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    });
  },
  // 获取商品详情信息
  getProductDetail(productId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/product/detail.do'),
      // data 一定是对象
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    });
  }
};

export default _product;
