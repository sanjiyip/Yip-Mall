/*
 * @Author: yip 
 * @Date: 2018-02-07 16:11:35 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-10 18:16:30
 */
import './index.scss';
import _mm from 'util/_mm.js';
import _user from 'service/user-service.js';
import _cart from 'service/cart-service.js';

const nav = {
  init() {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
    return this;
  },
  bindEvent() {
    // 登录点击事件
    $('.js-login').click(() => {
      _mm.doLogin();
    });
    // 注册点击事件——跳到注册页面
    $('.js-register').click(() => {
      window.location.href = './user-register.html';
    });
    // 退出点击事件——调用_user.logout登出
    $('.js-logout').click(() => {
      _user.logout(
        function(res) {
          // 重新加载页面，向后端请求数据?
          window.location.reload();
        },
        function(errMsg) {
          _mm.errorTips(errMsg);
        }
      );
    });
  },
  // 加载用户信息
  loadUserInfo() {
    _user.checkLogin(
      function(res) {
        // 加载用户信息成功
        $('.not-login')
          .hide()
          .siblings('.login')
          .show()
          .find('.username')
          .text(res.username);
      },
      function(errMsg) {
        // do nothing
      }
    );
  },
  // 加载购物车数量
  loadCartCount() {
    _cart.getCartCount(
      function(res) {
        // 加载购物车数量成功
        $('.cart-count').text(res || 0);
      },
      function(errMsg) {
        // 加载购物车数量失败，将购物车数量变为0
        $('.cart-count').text(0);
      }
    );
  }
};

export default nav.init();
