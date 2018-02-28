/*
 * @Author: yip 
 * @Date: 2018-02-01 21:27:04 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-28 10:26:05
 */
const hogan = require('hogan.js');

const config = {
  // 如果以后使用真实的服务器地址，更改即可
  serverHost: ''
};
// 先使用 ajax，然后再尝试使用 fetch 重构
const _mm = {
  // ajax 请求
  request(param) {
    const _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success(res) {
        // 请求成功
        if (res.status === 0) {
          typeof param.success === 'function' &&
            param.success(res.data, res.msg);
          // 没有登录状态，需要强制登录
        } else if (res.status === 10) {
          _this.doLogin();
          // 请求成功，但数据内容有错
        } else if (res.status === 1) {
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      //请求失败
      error(err) {
        typeof param.error === 'function' && param.error(err.statusText);
      }
    });
  },
  // 获取服务器地址(有效)
  getServerUrl(path) {
    return config.serverHost + path;
  },
  // 获取 url 地址参数
  getURLParam(name) {
    // window.location.search location.search 返回从问号到 URL 末尾的所有内容
    // substr(1)，则是截取第一个字符 ?
    // 使用 match 来匹配结果，返回结果是一个数组
    //使用 decodeURIComponent()解码,因为查询字符串应该是被编码过的
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null; //为什么要 result[2] 时才能匹配到???
  },
  // 使用 Hogan 模块来实现 html 模板渲染
  renderHTML(htmlTemplate, data) {
    const template = hogan.compile(htmlTemplate);
    const result = template.render(data);
    return result;
  },
  // successTips
  successTips(msg) {
    alert(msg || '操作成功！');
  },
  // errorTips
  errorTips(msg) {
    alert(msg || '哪有不对了~');
  },
  // 字段验证，支持是否为空，手机，邮箱
  validate(value, type) {
    // 清除左右两边的空格
    const val = $.trim(value);
    if (type === 'require') {
      return !!val;
    }
    if (type === 'phone') {
      return /^1[3|4|5|8][0-9]\d{4,8}$/.test(value);
    }
    if (type === 'email') {
      return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
        value
      );
    }
  },
  //  统一登录处理
  doLogin() {
    window.location.href = `./user-login.html?redirect=${encodeURIComponent(
      window.location.href
    )}`;
  },
  goHome() {
    window.location.href = './index.html';
  }
};

export default _mm;
