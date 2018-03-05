/*
 * @Author: yip 
 * @Date: 2018-02-28 16:50:36 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-05 16:45:24
 */

/* 下面的方法都是封装好的 ajax 请求 */
import _mm from 'util/_mm.js';

const _order = {
  // 获取商品列表信息
  getProductList(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/get_order_cart_product.do'),
      success: resolve,
      error: reject
    });
  },
  createOrder(orderInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/create.do'),
      data: orderInfo,
      success: resolve,
      error: reject
    });
  },
  getOrderList(listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    });
  },
  getOrderDetail(orderNumber, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/detail.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    });
  },
  cancelOrder(orderNumber, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/cancel.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    });
  }
};

export default _order;
