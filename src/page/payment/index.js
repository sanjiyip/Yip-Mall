/*
 * @Author: yip 
 * @Date: 2018-03-05 17:37:48 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-05 18:27:40
 */
import './index.scss';
import 'page/common/nav/index.js';
import 'page/common/header/index.js';
import _payment from 'service/payment-service.js';
import _mm from 'util/_mm.js';
import htmlTemplate from './index.string'; // import 可以导出 html 模板

const page = {
  data: {
    orderNumber: _mm.getURLParam('orderNumber')
  },
  init() {
    this.onload();
  },
  // 加载页面
  onload() {
    this.loadPaymentInfo();
  },
  loadPaymentInfo() {
    const _this = this;
    let paymentHTML = '';
    const $pageWrap = $('.page-wrap');
    _payment.getPaymentInfo(
      _this.data.orderNumber,
      res => {
        paymentHTML = _mm.renderHTML(htmlTemplate, res);
        $pageWrap.html(paymentHTML);
        _this.listenOrderStatus();
      },
      errMsg => {
        $pageWrap.html(`<p class="err-tip">${errMsg}</p>`);
      }
    );
  },
  // 轮询检查订单状态，返回状态成功，跳到成功页面
  listenOrderStatus() {
    const _this = this;
    const $pageWrap = $('.page-wrap');
    this.paymentTimer = window.setInterval(() => {
      _payment.getPaymentStatus(
        _this.data.orderNumber,
        res => {
          if (res) {
            window.location.href =
              './result.html?type=payment&orderNumber' + _this.data.orderNumber;
          }
        },
        errMsg => {
          $pageWrap.html(`<p class="err-tip">${errMsg}</p>`);
        }
      );
    }, 5e3);
  }
};

$(() => {
  page.init();
});
