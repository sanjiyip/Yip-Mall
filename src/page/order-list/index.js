/*
 * @Author: yip 
 * @Date: 2018-02-22 14:06:01 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-05 13:16:53
 */
import './index.scss';
import 'page/common/nav/index.js';
import 'page/common/header/index.js';
import navSide from 'page/common/nav-side/index.js';
import Pagination from 'util/pagination/index.js'; // 分页组件
import _order from 'service/order-service.js';
import _mm from 'util/_mm.js';
import htmlTemplate from './index.string'; // import 可以导出 html 模板

const page = {
  data: {
    listParam: {
      pageNum: 1,
      pageSize: 10
    }
  },
  init() {
    this.onload();
  },
  // 加载页面时，加载左侧框
  onload() {
    this.loadOrderList();
    navSide.init({
      name: 'order-list'
    });
  },
  // 加载分页信息
  loadOrderList() {
    const _this = this;
    const $listCon = $('.order-list-con');
    let orderListHTML = '';
    $listCon.html('<div class="loading"></div>');
    _order.getOrderList(
      _this.data.listParam,
      res => {
        // 渲染 HTML 模板
        orderListHTML = _mm.renderHTML(htmlTemplate, res);
        // 将模板插入文件中
        $listCon.html(orderListHTML);
        // 加载分页
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
      errMsg => {
        $listCon.html(
          '<p class="err-tip">加载出错了，请试一下重新加载看看~</p>'
        );
      }
    );
  },

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
          _this.loadOrderList();
        }
      })
    );
  }
};

$(() => {
  page.init();
});
