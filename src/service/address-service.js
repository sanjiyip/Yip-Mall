/*
 * @Author: yip 
 * @Date: 2018-03-01 10:16:03 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-02 15:06:10
 */

/* 下面的方法都是封装好的 ajax 请求 */
import _mm from 'util/_mm.js';

const _address = {
  // 获取商品列表信息
  getAddressList(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/shipping/list.do'),
      success: resolve,
      error: reject
    });
  },
  save(addressInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/shipping/add.do'),
      data: addressInfo,
      success: resolve,
      error: reject
    });
  },
  update(addressInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/shipping/update.do'),
      data: addressInfo,
      success: resolve,
      error: reject
    });
  },
  getAddress(shippingId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/shipping/select.do'),
      data: { shippingId: shippingId },
      success: resolve,
      error: reject
    });
  },
  deleteAddress(deleteId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/shipping/del.do'),
      data: { shippingId: deleteId },
      success: resolve,
      error: reject
    });
  }
};

export default _address;
