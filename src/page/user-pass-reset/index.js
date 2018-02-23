/*
 * @Author: yip 
 * @Date: 2018-02-21 19:52:53 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-22 12:14:52
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
  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  init() {
    this.loadStepUsername();
    this.bindEvent();
  },
  bindEvent() {
    const _this = this;
    // 输入用户名后的下一步按钮点击事件
    $('#submit-username').click(() => {
      let username = $.trim($('#user-name').val());
      if (username) {
        _user.getQuestion(
          username,
          res => {
            _this.data.username = username;
            _this.data.question = res;
            _this.loadStepQuestion();
          },
          errMsg => {
            formError.show(errMsg);
          }
        );
      } else {
        formError.show('请输入用户名');
      }
    });
    // 输入提示问题答案后下一步按钮点击事件
    $('#submit-question').click(() => {
      let answer = $.trim($('#answer').val());
      if (answer) {
        _user.checkAnswer(
          {
            username: _this.data.username,
            question: _this.data.question,
            answer: answer
          },
          res => {
            _this.data.answer = answer;
            _this.data.token = res;
            _this.loadStepPassword();
          },
          errMsg => {
            formError.show(errMsg);
          }
        );
      } else {
        formError.show('请输入正确提示问题答案');
      }
    });
    // 输入新密码后下一步按钮点击事件
    $('#submit-password').click(() => {
      let password = $.trim($('#password').val());
      if (password && password.length >= 6) {
        _user.resetPassword(
          {
            username: _this.data.username,
            passwordNew: password,
            forgetToken: _this.data.token
          },
          res => {
            window.location.href = './result.html?type=pass-reset';
          },
          errMsg => {
            formError.show(errMsg);
          }
        );
      } else {
        formError.show('请输入不少于6位的新密码');
      }
    });
  },

  // 用户名第一步
  loadStepUsername() {
    $('.step-username').show();
  },
  // 提示问题步
  loadStepQuestion() {
    // 清除错误信息
    formError.hide();
    // 显示提示问题输入框容器
    $('.step-username')
      .hide()
      .siblings('.step-question')
      .show()
      .find('.question')
      .text(this.data.question);
  },
  // 密码步
  loadStepPassword() {
    // 消除错误信息
    formError.hide();
    // 显示输入新密码容器
    $('.step-question')
      .hide()
      .siblings('.step-password')
      .show();
  }
};

$(() => {
  page.init();
});
