/*
 * @Author: yip 
 * @Date: 2018-02-01 22:43:26 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-24 09:32:42
 */
import './index.scss';
import 'page/common/nav/index.js';
import 'page/common/header/index.js';
import 'util/slide/index.js';
import _mm from 'util/_mm.js';
import templateBanner from './index.string';

$(() => {
  // 渲染 bannerHTML
  const bannerHTML = _mm.renderHTML(templateBanner);
  $('.banner-con').html(bannerHTML);
  // 初始化 banner
  let $slider = $('.banner').unslider({
    dots: true
  });
  // 绑定前一张操作的按钮事件
  $('.banner-arrow.prev').click(() => {
    $slider.data('unslider')['prev']();
  });
  // 绑定后一张操作的按钮事件
  $('.banner-arrow.next').click(() => {
    $slider.data('unslider')['next']();
  });
});
