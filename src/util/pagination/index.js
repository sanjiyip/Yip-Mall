/*
 * @Author: yip 
 * @Date: 2018-02-26 09:50:35 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-27 09:32:37
 */

import './index.scss';
import _mm from 'util/_mm.js';
import templatePagination from './index.string';

// 使用类的形式来构建组件
export default class Pagination {
  constructor() {
    const _this = this;
    this.defaultOption = {
      container: null, // jquery 对象（html 元素）
      pageNum: 1,
      pageRange: 3,
      onSelectPage: null
    };
    // 点击分页中的按钮进行跳转
    $(document).on('click', '.pg-item', function() {
      let $this = $(this);
      // 如果发生点击事件的 jquery HTML元素中有 class 值为 active 和 disable 时
      // 不做任何反应
      if ($this.hasClass('active') || $this.hasClass('disabled')) {
        return;
      }
      // 判断 onSelectPage 是否为函数，如果是，则调用
      typeof _this.option.onSelectPage === 'function'
        ? _this.option.onSelectPage($this.data('value'))
        : null;
    });
  }
  // 原型继承
  // 渲染分页方法
  render(userOption) {
    // 将默认项与传入的用户项进行合并而成的对象
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断 this.option 中的 container 是不是 jquery 对象
    if (!(this.option.container instanceof jQuery)) {
      return;
    }
    // 判断是否少于1页
    if (this.option.pages <= 1) {
      return;
    }
    // 将分页的内容添加到 this.option.container 中(因为他是 jquery 对象，所以可以调用 html() 这个方法)
    this.option.container.html(this.getPaginationHTML());
  }
  // 获取分页组件的 HTML：  |上一页| 3 4 5 =6= 7 8 9 |下一页| 6/12
  getPaginationHTML() {
    let html = '',
      pageArr = [],
      option = this.option,
      // 这边逻辑出问题了
      // 显示范围内最小的一页
      start =
        option.pageNum - option.pageRange > 0
          ? option.pageNum - option.pageRange
          : 1,
      end =
        option.pageNum + option.pageRange < option.pages
          ? option.pageNum + option.pageRange
          : option.pages;
    // 上一页按钮的数据
    pageArr.push({
      name: '上一页',
      value: option.prePage,
      disabled: !option.hasPreviousPage
    });
    // 分页中 数字按钮的数据
    for (let i = start; i <= end; i++) {
      pageArr.push({
        name: i,
        active: i === option.pageNum,
        value: i
      });
    }
    // 下一页按钮的数据
    pageArr.push({
      name: '下一页',
      value: option.nextPage,
      disabled: !option.hasNextPage
    });
    // 将数据渲染到 HTML 模板中
    html = _mm.renderHTML(templatePagination, {
      pageArr: pageArr,
      pageNum: option.pageNum,
      pages: option.pages
    });
    return html;
  }
}
