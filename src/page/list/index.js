/*
 * @Author: yip 
 * @Date: 2018-02-24 11:11:22 
 * @Last Modified by: yip
 * @Last Modified time: 2018-02-27 09:31:45
 */

import './index.scss';
import 'page/common/nav/index.js';
import 'page/common/header/index.js';
import _mm from 'util/_mm.js';
import Pagination from 'util/pagination/index.js'; // 分页组件
import _product from 'service/product-service.js';
import htmlTemplate from './index.string'; // import 可以导出 html 模板

const page = {
  pagination: null,
  data: {
    listParam: {
      categoryId: _mm.getURLParam('categoryId') || '',
      keyword: _mm.getURLParam('keyword') || '',
      pageNum: _mm.getURLParam('pageNum') || 1,
      pageSize: _mm.getURLParam('pageSize') || 10,
      orderBy: _mm.getURLParam('orderBy') || 'default'
    }
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    this.loadList();
  },
  bindEvent() {
    const _this = this;
    $('.sort-item').click(
      // 使用箭头函数却不行？为什么？
      function() {
        // 将分页码数设置为1
        _this.data.listParam.pageNum = 1;
        // 这个 this 是指 '.sort-item' 元素
        const $this = $(this);
        // 通过 data.type 判断为默认排序按钮
        if ($this.data('type') === 'default') {
          if ($this.hasClass('active')) {
            return;
          } else {
            $this
              .addClass('active')
              .siblings('.sort-item')
              .removeClass('active desc asc');
            _this.data.listParam.orderBy = 'default';
          }
        } else if ($this.data('type') === 'price') {
          $this
            .addClass('active')
            .siblings('.sort-item')
            .removeClass('active desc asc');
          // 价格排序按钮，判断现在是升序还是降序
          if (!$this.hasClass('asc')) {
            //目前为降序
            $this.addClass('asc').removeClass('desc');
            _this.data.listParam.orderBy = 'price_asc';
          } else {
            // 目前为升序
            $this.addClass('desc').removeClass('asc');
            _this.data.listParam.orderBy = 'price_desc';
          }
        }
        // 重新加载页面
        _this.loadList();
      }
    );
  },
  // 加载商品列表，通过 ajax 请求后端的列表数据
  loadList() {
    const _this = this;
    let listParam = _this.data.listParam;
    let listHTML = '';
    _product.getProductList(
      listParam,
      res => {
        // 异步成功，将返回的数据渲染到html模板中
        listHTML = _mm.renderHTML(htmlTemplate, {
          list: res.list
        });
        // 将 html 模板加载到 list 页面中
        $('.p-list-con').html(listHTML);
        // 加载分页信息
        _this.loadPagination(
          // 参数 pageInfo 对象
          {
            hasPreviousPage: res.hasPreviousPage,
            prePage: res.prePage,
            hasNextPage: res.hasNextPage,
            nextPage: res.nextPage,
            pageNum: res.pageNum,
            pages: res.pages
          }
        );
      },
      // 异步失败，弹出错误信息
      errMsg => {
        _mm.errorTips(errMsg);
      }
    );
  },
  // 加载分页
  loadPagination(pageInfo) {
    // 封装组件的时候
    // 下面是使用构造方法来创建对象
    const _this = this;
    this.pagination ? '' : (this.pagination = new Pagination());
    this.pagination.render(
      $.extend({}, pageInfo, {
        container: $('.pagination'),
        onSelectPage(pageNum) {
          _this.data.listParam.pageNum = pageNum;
          _this.loadList();
        }
      })
    );
  }
};

$(() => {
  page.init();
});
