/*
 * @Author: yip 
 * @Date: 2018-02-22 14:06:01 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-22 19:12:16
 */
import './index.scss';
import 'page/common/nav/index.js';
import 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';
import _mm from 'util/_mm.js';
import _user from 'service/user-service.js';
import htmlTemplate from './index.string'; // import 可以导出 html 模板

const page = {
  init() {
    this.onload();
  },
  // 加载页面时，加载左侧框
  onload() {
    navSide.init({
      name: 'user-center'
    });
    this.loadUserInfo();
  },
  // 加载用户信息
  loadUserInfo() {
    let userHTML = '';
    _user.getUserInfo(
      // 异步成功，
      res => {
        userHTML = _mm.renderHTML(htmlTemplate, res);
        $('.panel-body').html(userHTML);
      },
      // 异步错误，返回错误信息
      errMsg => {
        _mm.errorTips(errMsg);
      }
    );
  }
};

$(() => {
  page.init();
});
