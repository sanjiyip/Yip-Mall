/*
 * @Author: yip 
 * @Date: 2018-02-10 09:33:13 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-22 12:25:13
 */
import './index.scss';
import _mm from 'util/_mm.js';
import _user from 'service/user-service.js';
import '../common/nav-simple/index.js';

// 表单错误信息
const formError = {
  show(errorMsg) {
    // 显示错误信息框，并修改它里面的错误信息内容
    $('.error-item')
      .show()
      .find('.error-msg')
      .text(errorMsg);
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
    // 用户页面登录点击事件
    $('#submit').click(() => {
      _this.submit();
    });
    // 用户页面回车等事件
    $('.user-content').keyup(e => {
      if (e.keyCode === 13) {
        _this.submit();
      }
    });
  },
  submit() {
    // 表单内容
    let formData = {
      username: $.trim($('#user-name').val()),
      password: $.trim($('#password').val())
    };
    // 表单验证结果
    let validateResult = this.formValidate(formData);
    // 判断验证结果
    if (validateResult.status) {
      // 验证成功的操作，将数据传到后端
      _user.login(
        formData,
        res => {
          // 跳转到之前的页面
          window.location.href = _mm.getURLParam('redirect') || './index.html';
        },
        errorMsg => {
          formError.show(errorMsg);
        }
      );
    } else {
      // 验证失败的操作
      formError.show(validateResult.msg);
    }
  },
  formValidate(formData) {
    let result = {
      status: false,
      msg: ''
    };
    // 使用工具模块中的 validate() 来验证表单内容是否为空
    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空~';
      return result;
    }
    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空~';
      return result;
    }
    result.status = true;
    return result;
  }
};

$(() => {
  page.init();
});
