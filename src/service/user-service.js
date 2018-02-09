/*
 * @Author: yip 
 * @Date: 2018-02-07 19:53:55 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-08 11:35:07
 */
import _mm from 'util/_mm.js';

const _user = {
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
