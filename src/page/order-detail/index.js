/*
 * @Author: yip 
 * @Date: 2018-03-05 14:22:17 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-05 16:51:14
 */

import './index.scss';
import 'page/common/nav/index.js';
import 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';
import _order from 'service/order-service.js';
import _mm from 'util/_mm.js';
import htmlTemplate from './index.string'; // import 可以导出 html 模板

const page = {
  data: {
    orderNumber: _mm.getURLParam('orderNumber')
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  // 加载页面时，加载左侧框
  onload() {
    navSide.init({
      name: 'order-list'
    });
    this.loadOrderDetail();
  },
  bindEvent() {
    const _this = this;
    $(document).on('click', '.order-cancel', function() {
      if (window.confirm('确定要取消该订单吗')) {
        _order.cancelOrder(
          _this.data.orderNumber,
          res => {
            _mm.successTips('取消订单成功');
            _this.loadOrderDetail();
          },
          errMsg => {
            _mm.errorTips(errMsg);
          }
        );
      }
    });
  },
  // 加载分页信息
  loadOrderDetail() {
    const _this = this;
    const $content = $('.content');
    let orderDetailHTML = '';
    $content.html('<div class="loading"></div>');
    _order.getOrderDetail(
      _this.data.orderNumber,
      res => {
        _this.dataFilter(res);
        // 渲染 HTML 模板
        orderDetailHTML = _mm.renderHTML(htmlTemplate, res);
        // 将模板插入文件中
        $content.html(orderDetailHTML);
      },
      errMsg => {
        $content.html(
          '<p class="err-tip">加载出错了，请试一下重新加载看看~</p>'
        );
      }
    );
  },
  // 数据适配
  dataFilter(data) {
    data.needPay = data.status == 10;
    data.isCancelable = data.status == 10;
  }
};

$(() => {
  page.init();
});
