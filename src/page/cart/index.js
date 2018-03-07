/*
 * @Author: yip 
 * @Date: 2018-02-27 16:18:57 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-05 17:31:06
 */

import './index.scss';
import 'page/common/header/index.js';
import nav from 'page/common/nav/index.js';
import _mm from 'util/_mm.js';
import _cart from 'service/cart-service.js';
import htmlTemplate from './index.string'; // import 可以导出 html 模板

const page = {
  data: {
    cartInfo: null
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    this.loadCart();
  },
  bindEvent() {
    const _this = this;
    // 单选一个
    $(document).on('click', '.cart-select', function() {
      const $this = $(this);
      const productId = $this.parents('.cart-table').data('product-id');
      if ($this.is(':checked')) {
        // checkbox被选中，向后台发送 ajax 请求
        _cart.selectProduct(
          productId,
          res => {
            _this.loadCart();
          },
          errMsg => {
            _this.cartErrMsg();
          }
        );
      } else {
        //取消选中，向后台发送 ajax 请求
        _cart.unselectProduct(
          productId,
          res => {
            _this.loadCart();
          },
          errMsg => {
            _this.cartErrMsg();
          }
        );
      }
    });
    // 全选事件
    $(document).on('click', '.cart-select-all', function() {
      const $this = $(this);
      if ($this.is(':checked')) {
        // checkbox被选中，向后台发送 ajax 请求
        _cart.selectAllProduct(
          res => {
            _this.loadCart();
          },
          errMsg => {
            _this.cartErrMsg();
          }
        );
      } else {
        //取消选中，向后台发送 ajax 请求
        _cart.unselectAllProduct(
          res => {
            _this.loadCart();
          },
          errMsg => {
            _this.cartErrMsg();
          }
        );
      }
    });
    // 增减购买数量事件
    $(document).on('click', '.count-btn', function() {
      const $this = $(this);
      const $pCount = $this.siblings('.count-input');
      let currCount = parseInt($pCount.val()),
        maxCount = $pCount.data('max'),
        minCount = 1,
        newCount = 0,
        productId = $pCount.parents('.cart-table').data('product-id'),
        type = $this.hasClass('plus') ? 'plus' : 'minus';

      if (type === 'plus') {
        if (currCount >= maxCount) {
          return;
        }
        newCount = currCount + 1;
      } else if (type === 'minus') {
        if (currCount <= minCount) {
          return;
        }
        newCount = currCount - 1;
      }
      _cart.updateProduct(
        { productId: productId, count: newCount },
        res => {
          _this.loadCart();
        },
        errMsg => {
          _this.cartErrMsg();
        }
      );
    });
    // 删除单商品事件
    $(document).on('click', '.cart-delete', function() {
      if (window.confirm('确定要删除该商品吗？')) {
        const $this = $(this);
        let productId = $this.parents('.cart-table').data('product-id');
        _this.deleteCartProduct(productId);
      }
    });
    // 删除所有选中的商品
    $(document).on('click', '.delete-selected', function() {
      if (window.confirm('确定要选中的商品吗？')) {
        const $this = $(this);
        // 用数组保存 productId
        let arrProductIds = [];
        let $selectItem = $('.cart-select:checked');
        for (let i, iLength = $selectItem.length; i < iLength; i++) {
          arrProductIds.push(
            $($selectItem[i])
              .parents('.cart-table')
              .data('product-id')
          );
        }
        _this.deleteCartProduct(arrProductIds);
      }
    });
    // 提交确认订单
    $(document).on('click', '.btn-submit', function() {
      if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
        window.location.href = './order-confirm.html';
      } else {
        _mm.errorTips('请选择商品后再提交');
      }
    });
  },
  // 加载购物车
  loadCart() {
    const _this = this;
    let html = '';
    // $pageWrap.html('<div class="loading"></div>');
    _cart.getCartList(
      res => {
        _this.renderCart(res);
      },
      errMsg => {
        _this.cartErrMsg();
        _mm.errorTips(errMsg);
      }
    );
  },
  // 渲染购物车
  renderCart(data) {
    this.filter(data);
    // 缓存 data 数据
    this.data.cartInfo = data;
    const cartHTML = _mm.renderHTML(htmlTemplate, data);
    $('.page-wrap').html(cartHTML);
    nav.loadCartCount();
  },
  filter(data) {
    // 这个缓存数据的目的是为了让模板能够使用
    data.notEmpty = !!data.cartProductVoList.length;
  },
  // 错误信息提示
  cartErrMsg() {
    $('.page-wrap').html('<p class="err-tip">哪里不对了，试试重新刷新~</p>');
  },
  // 指定删除、批量删除
  deleteCartProduct(productIds) {
    const _this = this;
    _cart.deleteProduct(
      productIds,
      res => {
        _this.renderCart(res);
      },
      errMsg => {
        _this.cartErrMsg();
      }
    );
  }
};

$(() => {
  page.init();
});
