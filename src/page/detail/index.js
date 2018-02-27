/*
 * @Author: yip 
 * @Date: 2018-02-27 09:55:41 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-27 15:22:59
 */
import './index.scss';
import 'page/common/nav/index.js';
import 'page/common/header/index.js';
import _mm from 'util/_mm.js';
import _product from 'service/product-service.js';
import _cart from 'service/cart-service.js';
import htmlTemplate from './index.string'; // import 可以导出 html 模板

const page = {
  data: {
    productId: _mm.getURLParam('productId') || '',
    detailInfo: null
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    // 如果没有传 productId 自动跳转回首页
    if (!this.data.productId) {
      _mm.goHome();
    }
    this.loadDetail();
  },
  bindEvent() {
    // 图片预览
    const _this = this;
    $(document).on('mouseenter', '.p-img-item', function() {
      let imgURL = $(this)
        .find('.p-img')
        .attr('src');
      $('.main-img').attr('src', imgURL);
    });
    // count 操作 + -
    $(document).on('click', '.p-count-btn', function() {
      let type = $(this).hasClass('plus') ? 'plus' : 'minus';
      // 数量框的内容
      let $pCount = $('.p-count'),
        currCount = parseInt($pCount.val()),
        // 当前数量从后端取出
        minCount = 1,
        maxCount = _this.data.detailInfo.stock || 1;
      // 判断加减号
      if (type === 'plus') {
        $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
      } else if (type === 'minus') {
        $pCount.val(currCount > minCount ? currCount - 1 : minCount);
      }
    });
    //添加都购物车
    $(document).on('click', '.cart-add', function() {
      _cart.addToCart(
        {
          productId: _this.data.productId,
          count: $('.p-count').val()
        },
        res => {
          window.location.href = './result.html?type=cart-add';
        },
        errMsg => {
          _mm.errorTips(errMsg);
        }
      );
    });
  },
  // 加载页面详情信息
  loadDetail() {
    const _this = this;
    const $pageWrap = $('.page-wrap');
    let html = '';
    // 未加载数据时，显示 loading
    $pageWrap.html('<div class="loading"></div>');
    // 向后端接口请求数据
    _product.getProductDetail(
      this.data.productId,
      res => {
        // 先对返回的数据进行一次处理
        _this.filter(res);
        //缓存返回的数据在 data 对象中
        _this.data.detailInfo = res;
        html = _mm.renderHTML(htmlTemplate, res);
        $pageWrap.html(html);
      },
      errMsg => {
        $pageWrap.html('<p class="err-tip">此商品真淘气，找不到了</p>');
      }
    );
  },
  // 将数据subImages从字符串切割成数组
  //"0093f5d3-bdb4-4fb0-bec5-5465dfd26363.jpeg,13da2172-4445-4eb5-a13f-c5d4ede8458c.jpeg,58d5d4b7-58d4-4948-81b6-2bae4f79bf02.jpeg"
  filter(data) {
    data.subImages = data.subImages.split(',');
  }
};

$(() => {
  page.init();
});
