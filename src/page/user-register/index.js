/*
 * @Author: yip 
 * @Date: 2018-02-10 14:46:42 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-10 18:13:38
 */
import './index.scss';
import '../common/nav-simple/index.js';
import _mm from 'util/_mm.js';
import _user from '../../service/user-service';

// 错误信息的隐藏与显示
const formError = {
  show(errMsg) {
    $('.error-item')
      .show()
      .find('.error-msg')
      .text(errMsg);
  },
  hide() {
    $('.error-item')
      .hide()
      .find('.error-msg')
      .text('');
  }
};

const page = {
  init() {
    this.bindEvent();
  },
  bindEvent() {
    const _this = this;
    // 用户名表单失焦验证事件
    $('#user-name').blur(() => {
      //获取表单值 这里 this 是指向 $('#user-name')
      const username = $.trim($('#user-name').val());
      _user.checkUsername(
        username,
        res => {
          // 异步请求成功
          formError.hide();
        },
        errMsg => {
          // 异步请求失败
          formError.show(errMsg);
        }
      );
    });
    // 点击提交事件
    $('#submit').click(() => {
      _this.submit();
    });
    // 回车提交事件
    $('.user-content').keyup(e => {
      if (e.keyCode === 13) {
        _this.submit();
      }
    });
  },
  // 提交表单
  submit() {
    const formData = {
      username: $.trim($('#user-name').val()),
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val())
    };
    const validateResult = this.formValidate(formData);
    if (validateResult.status) {
      // 字段验证通过，向后台发送异步请求
      _user.register(
        formData,
        res => {
          // 跳转到注册成功页面
          window.location.href = './result.html?type=register';
        },
        errMsg => {
          formError.show(errMsg);
        }
      );
    } else {
      // 字段验证不通过，返回错误信息
      formError.show(validateResult.msg);
    }
  },
  // 表单验证
  formValidate(formData) {
    const result = {
      status: false,
      msg: ''
    };
    // 各种表单验证
    // 判断用户名是否为空
    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空~';
      return result;
    }
    // 判断密码是否为空
    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空~';
      return result;
    }
    // 判断密码不能小于6位数组
    if (formData.password.length < 6) {
      result.msg = '密码不能少于6位~';
      return result;
    }
    // 判断两组密码是否相同
    if (formData.password !== formData.passwordConfirm) {
      result.msg = '两次输入的密码不一样~';
      return result;
    }
    // 判断手机号码是否正确
    if (!_mm.validate(formData.phone, 'phone')) {
      result.msg = '输入的手机号不正确~';
      return result;
    }
    // 判断邮箱是否正确
    if (!_mm.validate(formData.email, 'email')) {
      result.msg = '输入的邮箱不正确~';
      return result;
    }
    // 判断提示问题是否为空
    if (!_mm.validate(formData.question, 'require')) {
      result.msg = '提示问题不能为空~';
      return result;
    }
    // 判断提示问题的答案是否为空
    if (!_mm.validate(formData.answer, 'require')) {
      result.msg = '提示问题答案不能为空~';
      return result;
    }
    result.status = true;
    return result;
  }
};

$(() => {
  page.init();
});
