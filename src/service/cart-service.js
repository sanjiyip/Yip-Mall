/*
 * @Author: yip 
 * @Date: 2018-02-08 11:41:48 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-08 12:06:01
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
  }
};

export default _cart;
