/*
 * @Author: yip 
 * @Date: 2018-02-22 14:06:55 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-22 20:19:29
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
    this.bindEvent();
  },
  // 加载页面时，加载左侧框
  onload() {
    navSide.init({
      name: 'user-center'
    });
    this.loadUserInfo();
  },
  bindEvent() {
    // 为什么这里要用冒泡事件
    $(document).on('click', '.btn-submit', () => {
      // 获取所有字段信息，并验证
      let userInfo = {
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val())
      };
      let formValidateResult = this.formValidate(userInfo);
      if (formValidateResult.status) {
        _user.updateUserInfo(
          userInfo,
          (res, msg) => {
            _mm.successTips(msg);
            window.location.href = './user-center.html';
          },
          errMsg => {
            _mm.errorTips(errMsg);
          }
        );
      } else {
        // ??参数是什么呢
        _mm.errorTips(formValidateResult.msg);
      }
    });
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
  },
  // 验证信息
  formValidate(formData) {
    const result = {
      status: false,
      msg: ''
    };
    // 验证手机号
    if (!_mm.validate(formData.phone, 'phone')) {
      result.msg = '请输入正确的手机号';
      return result;
    }
    // 验证邮箱
    if (!_mm.validate(formData.email, 'email')) {
      result.msg = '请输入正确的邮箱地址';
      return result;
    }
    // 验证密码提示问题不为空
    if (!_mm.validate(formData.question, 'require')) {
      result.msg = '提示问题不能为空';
      return result;
    }
    // 验证密码提示问题答案不为空
    if (!_mm.validate(formData.answer, 'require')) {
      result.msg = '提示问题答案不能为空';
      return result;
    }
    result.status = true;
    return result;
  }
};

$(() => {
  page.init();
});
