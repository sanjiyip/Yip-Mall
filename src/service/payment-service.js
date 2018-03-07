/* 下面的方法都是封装好的 ajax 请求 */
import _mm from 'util/_mm.js';

const _payment = {
  // 获取支付二维码
  getPaymentInfo(orderNumber, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/pay.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    });
  },
  getPaymentStatus(orderNumber, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/query_order_pay_status.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    });
  }
};

export default _payment;
