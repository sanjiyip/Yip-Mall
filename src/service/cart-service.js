/*
 * @Author: yip 
 * @Date: 2018-02-08 11:41:48 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-28 15:02:13
 */
import _mm from 'util/_mm.js';

const _cart = {
  getCartCount(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
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
  },
  getCartList(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/list.do'),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  selectProduct(productId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/select.do'),
      method: 'GET',
      data: { productId: productId },
      success: resolve,
      error: reject
    });
  },
  unselectProduct(productId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/un_select.do'),
      method: 'GET',
      data: { productId: productId },
      success: resolve,
      error: reject
    });
  },
  selectAllProduct(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/select_all.do'),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  unselectAllProduct(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/un_select_all.do'),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  updateProduct(productInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/update.do'),
      data: productInfo,
      success: resolve,
      error: reject
    });
  },
  deleteProduct(productIds, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/cart/delete_product.do'),
      data: { productIds: productIds },
      success: resolve,
      error: reject
    });
  }
};

export default _cart;
