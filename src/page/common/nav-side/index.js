/*
 * @Author: yip 
 * @Date: 2018-02-09 12:02:53 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-09 14:14:18
 */
import './index.scss';
import _mm from 'util/_mm.js';
import htmlTemplate from './index.string';

const navSide = {
  option: {
    name: '',
    navList: [
      { name: 'user-center', desc: '用户中心', href: './user-center.html' },
      { name: 'order-list', desc: '我的订单', href: './order-list.html' },
      { name: 'pass-update', desc: ' 修改密码', href: './pass-update.html' },
      { name: 'about', desc: '关于YipMall', href: './about.html' }
    ]
  },

  init(option) {
    // 参数 option 也是一个对象，里面有 name 属性。option 与 this.option 合并
    // 使用 JQ 来合并两个对象中的属性
    // this.option没问题，因为 this.option 是以参数的形式传入。当 navSide.init() 时，this 值向就是 navSide 对象
    $.extend(this.option, option);
    this.renderNav();
  },
  // 渲染导航菜单
  renderNav() {
    // 计算 active 数据
    for (let item of this.option.navList) {
      if (item.name === this.option.name) {
        item.isActive = true;
      }
    }
    // 使用 hogan 模板来渲染 nav-side 中的 li （引入 index.string 文件）
    const navHTML = _mm.renderHTML(htmlTemplate, {
      navList: this.option.navList
    });
    // 添加到页面
    $('.nav-side').html(navHTML);
  }
};

export default navSide;
