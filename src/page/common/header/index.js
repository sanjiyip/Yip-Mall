/*
 * @Author: yip 
 * @Date: 2018-02-08 12:58:21 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-08 15:10:36
 */
import './index.scss';
import _mm from 'util/_mm.js';

const header = {
  init() {
    this.bindEvent();
    this.onload();
  },
  // 页面重新加载时，将 url 中 keyword 回填到搜索栏中
  onload() {
    const keyword = _mm.getURLParam('keyword');
    if (keyword) {
      $('#search-input').val(keyword);
    }
  },
  // 搜索的提交
  searchSubmit() {
    // 提取输入框的关键字（并删除前后空格）
    const keyword = $.trim($('#search-input').val());

    if (keyword) {
      // 如果搜索栏存在关键字，提交时则跳到列表页的对应关键字 url
      window.location.href = './list.html?keyword=' + keyword;
    } else {
      // 如果搜索栏没有关键字，提交时跳到首页
      _mm.goHome();
    }
  },
  bindEvent() {
    const _this = this;
    $('#search-btn').click(() => {
      _this.searchSubmit();
    });
    $('#search-input').keyup(e => {
      if (e.keyCode === 13) {
        _this.searchSubmit();
      }
    });
  }
};
header.init();
