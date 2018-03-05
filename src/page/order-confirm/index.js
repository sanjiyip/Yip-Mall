/*
 * @Author: yip 
 * @Date: 2018-02-28 16:36:02 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-05 16:23:56
 */
import './index.scss';
import 'page/common/header/index.js';
import 'page/common/nav/index.js';
import _mm from 'util/_mm.js';
import _order from 'service/order-service.js';
import _address from 'service/address-service.js';
import templateProduct from './product-list.string'; // 商品清单 html 模板
import templateAddress from './address-list.string'; // 收货地址 html 模板
import addressModal from './address-modal.js';

const page = {
  data: {
    // 缓存数据
    productListInfo: null,
    addressListInfo: null,
    selectAddressId: null
  },
  init() {
    this.bindEvent();
    this.onload();
  },
  bindEvent() {
    const _this = this;
    // 选择地址事件
    $(document).on('click', '.address-item', function() {
      $(this)
        .addClass('active')
        .siblings('.address-item')
        .removeClass('active');
      //将当前的元素 id 存起来
      _this.data.selectAddressId = $(this).data('id');
    });
    // 提交订单事件 点击一次，执行多次
    $(document).on('click', '.order-submit', function(e) {
      const shippingId = _this.data.selectAddressId;
      if (shippingId) {
        _order.createOrder(
          {
            shippingId: shippingId
          },
          res => {
            window.location.href = './payment.html?orderNo=' + res.orderNo;
          },
          errMsg => {
            _mm.errorTips(errMsg);
          }
        );
      } else {
        _mm.errorTips('请选择地址后，再提交订单。');
      }
    });
    // 新增收件人信息点击事件
    $(document).on('click', '.address-add', function() {
      // 调用 addressModal 工具的 show 来显示页面内容
      addressModal.show({
        isUpdate: false,
        onSuccess() {
          // 重新加载地址列表
          _this.loadAddressList();
        }
      });
    });
    // 更新收件人信息事件(编辑)
    $(document).on('click', '.address-update', function(e) {
      e.stopPropagation();
      // 获取这条收件人信息
      const shippingId = $(this)
        .parents('.address-item')
        .data('id');
      _address.getAddress(
        shippingId,
        res => {
          addressModal.show({
            isUpdate: true,
            data: res,
            onSuccess() {
              _this.loadAddressList();
            }
          });
        },
        errMsg => {
          _mm.errorTips(errMsg);
        }
      );
    });
    // 删除收件人信息事件
    $(document).on('click', '.address-delete', function(e) {
      e.stopPropagation();
      const deleteId = $(this)
        .parents('.address-item')
        .data('id');
      if (window.confirm('确定要删除地址？')) {
        _address.deleteAddress(
          deleteId,
          res => {
            _mm.successTips(res);
            _this.loadAddressList();
          },
          errMsg => {
            _mm.errorTips(errMsg);
          }
        );
      }
    });
  },
  onload() {
    this.loadAddressList();
    this.loadProductList();
  },
  // 加载地址清单
  loadAddressList() {
    const _this = this;
    $('.address-con').html('<div class="loading"></div>');
    _address.getAddressList(
      res => {
        // 保存选中的状态，即使异步操作更新页面也可以保留
        _this.addressFilter(res);
        _this.data.addressListInfo = res;
        const addressListHTML = _mm.renderHTML(templateAddress, res);
        $('.address-con').html(addressListHTML);
      },
      errMsg => {
        $('.address-con').html('加载地址失败，请重新刷新页面~');
      }
    );
  },
  // 处理地址列表中的选择状态
  addressFilter(data) {
    // 先判断是否存在 selectId，如果存在的话，再做数据处理
    if (this.data.selectAddressId) {
      // 设置一个标记位
      let selectAddressIdFlag = false;
      // 在 for 循环中要确认到底有没有 selectId
      // 原来是循环中漏了 i = 0 ，导致无法做循环  。。。
      for (let i = 0, len = data.list.length; i < len; i++) {
        console.log(this.data.selectAddressId);
        if (data.list[i].id === this.data.selectAddressId) {
          data.list[i].isActive = true;
          selectAddressIdFlag = true;
        }
        // 如果以前选中的地址不在列表里，然后将 selectAddressId 删除
        if (!selectAddressIdFlag) {
          this.data.selectAddressId = null;
        }
      }
    }
  },
  // 加载产品清单
  loadProductList() {
    const _this = this;
    $('.product-con').html('<div class="loading"></div>');
    _order.getProductList(
      res => {
        _this.data.productListInfo = res;
        const productListHTML = _mm.renderHTML(templateProduct, res);
        $('.product-con').html(productListHTML);
      },
      errMsg => {
        $('.product-con').html(
          '<p class="err-tip">加载商品清单失败，请重新刷新页面。</p>'
        );
      }
    );
  }
};

$(() => {
  page.init();
});
