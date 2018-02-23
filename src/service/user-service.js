/*
 * @Author: yip 
 * @Date: 2018-02-07 19:53:55 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-23 10:21:57
 */
/* 下面的方法都是封装好的 ajax 请求 */
import _mm from 'util/_mm.js';

const _user = {
  // 注册接口
  register(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/register.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  // 验证用户名是否重复的接口
  checkUsername(username, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/check_valid.do'),
      method: 'POST',
      data: {
        type: 'username',
        str: username
      },
      success: resolve,
      error: reject
    });
  },
  // 用户登录
  login(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/login.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  // 获取用户密码提示问题
  getQuestion(username, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_get_question.do'),
      method: 'POST',
      data: { username: username },
      success: resolve,
      error: reject
    });
  },
  // 验证密码提示问题答案是否正确
  checkAnswer(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_check_answer.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  // 重设密码
  resetPassword(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_reset_password.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  // 获取用户信息
  getUserInfo(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_information.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 修改密码
  updatePassword(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/reset_password.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  // 更新用户信息
  updateUserInfo(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/update_information.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  // 登出
  logout(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 检查用户登录状态
  checkLogin(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  }
};

export default _user;
