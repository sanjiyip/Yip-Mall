/*
 * @Author: yip 
 * @Date: 2018-02-08 11:41:48 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-27 15:26:07
 */
import _mm from 'util/_mm.js';

const _cart = {
  getCartCount(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/logout.do'),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  addToCart(detailInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/add.do'),
      method: 'GET',
      data: detailInfo,
      success: resolve,
      error: reject
    });
  }
};

export default _cart;
