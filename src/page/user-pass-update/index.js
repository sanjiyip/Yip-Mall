/*
 * @Author: yip 
 * @Date: 2018-02-22 20:34:06 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-23 10:31:04
 */
import './index.scss';
import 'page/common/nav/index.js';
import 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';
import _mm from 'util/_mm.js';
import _user from 'service/user-service.js';

const page = {
  init() {
    this.onload();
  },
  onload() {
    navSide.init({
      name: 'user-pass-update'
    });
    this.bindEvent();
  },
  bindEvent() {
    $(document).on('click', '.btn-submit', () => {
      let userInfo = {
        passwordOld: $.trim($('#password').val()),
        passwordNew: $.trim($('#password-new').val()),
        passwordConfirm: $.trim($('#password-confirm').val())
      };
      let formValidateResult = this.formValidate(userInfo);
      // 密码字段验证通过
      if (formValidateResult.status) {
        // 将密码异步提交到后端
        _user.updatePassword(
          {
            passwordNew: userInfo.passwordNew,
            passwordOld: userInfo.passwordOld
          },
          res => {
            _mm.successTips(res);
            // 跳到登录页面重新登录？
            window.location.href = './user-login.html';
          },
          errMsg => {
            _mm.errorTips(errMsg);
          }
        );
      } else {
        _mm.errorTips(formValidateResult.msg);
      }
    });
  },
  formValidate(formData) {
    const result = {
      status: false,
      msg: ''
    };
    if (
      !_mm.validate(formData.passwordOld, 'require') ||
      formData.passwordOld.length < 6
    ) {
      result.msg = '原密码不能少于6位';
      return result;
    }
    if (
      !_mm.validate(formData.passwordNew, 'require') ||
      formData.passwordNew.length < 6
    ) {
      result.msg = '新密码不能少于6位';
      return result;
    }
    if (
      !_mm.validate(formData.passwordConfirm, 'require') ||
      formData.passwordConfirm.length < 6
    ) {
      result.msg = '确认密码不能少于6位';
      return result;
    }
    if (formData.passwordNew !== formData.passwordConfirm) {
      result.msg = '新密码与确认密码不相同';
      return result;
    }
    result.status = true;
    return result;
  }
};
$(() => {
  page.init();
});
