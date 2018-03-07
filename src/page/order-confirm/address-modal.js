/*
 * @Author: yip 
 * @Date: 2018-03-01 14:55:27 
 * @Last Modified by: yip
 * @Last Modified time: 2018-03-06 12:05:31
 */

import _mm from 'util/_mm.js';
import _cities from 'util/cities/index.js';
import _address from 'service/address-service.js';
import templateAddressModal from './address-modal.string';

const addressModal = {
  option: {},
  $modalWrap: $('.modal-wrap'),

  // 显示弹窗框
  show(option) {
    // 缓存
    this.option = option; // option 为一个对象
    this.bindEvent();
    this.loadModal();
  },
  // 隐藏弹窗
  hide() {
    this.$modalWrap.empty();
  },
  // 事件绑定
  bindEvent() {
    const _this = this;
    // 省份与城市二级联动
    $(document).on('change', '#receiver-province', function() {
      let provinceName = $(this).val();
      _this.loadCities(provinceName);
    });
    // 保存收货人地址按钮点击事件 这个事件为什么会执行两次？？？？？
    $(document).on('click', '.address-btn', function(e) {
      e.stopPropagation();
      const receiverInfo = _this.getReceiverInfo();
      const isUpdate = _this.option.isUpdate;
      // 使用新地址并验证字段通过
      if (!isUpdate && receiverInfo.state) {
        //  异步请求操作-向后台发送新增地址数据
        _address.save(
          receiverInfo.data,
          res => {
            _mm.successTips('添加地址成功');
            _this.hide();
            typeof _this.option.onSuccess === 'function'
              ? _this.option.onSuccess(res)
              : '';
          },
          errMsg => {
            _mm.errorTips(errMsg);
          }
        );
      } else if (isUpdate && receiverInfo.state) {
        // 更新地址并验证字段通过
        _address.update(
          receiverInfo.data,
          res => {
            _mm.successTips('更新地址成功');
            _this.hide();
            typeof _this.option.onSuccess === 'function'
              ? _this.option.onSuccess(res)
              : '';
          },
          errMsg => {
            _mm.errorTips(errMsg) || _mm.errorTips('哪里不对了');
          }
        );
      } else {
        _mm.errorTips(receiverInfo.errMsg);
      }
    });
    // 阻止冒泡（使用事件代理时）
    $(document).on('click', '.modal-container', function(e) {
      e.stopPropagation();
    });
    // 点击蒙版和关闭按钮关闭弹窗事件
    $(document).on('click', '.close', function() {
      _this.hide();
    });
  },
  // 加载弹窗
  loadModal() {
    const addressModalHTML = _mm.renderHTML(templateAddressModal, {
      isUpdate: this.option.isUpdate,
      data: this.option.data
    });
    this.$modalWrap.html(addressModalHTML);
    this.loadProvince();
  },
  //加载下拉菜单选项（省份）
  loadProvince() {
    // 获取有所有省份名组成一个数组
    const provinces = _cities.getProvince() || [];
    const $provinceSelect = this.$modalWrap.find('#receiver-province');
    $provinceSelect.html(this.getSelectOption(provinces));
    if (this.option.isUpdate && this.option.data.receiverProvince) {
      $provinceSelect.val(this.option.data.receiverProvince);
      this.loadCities(this.option.data.receiverProvince);
    }
  },
  // 加载下拉菜单选项（城市)
  loadCities(provinceName) {
    // 正常
    const cities = _cities.getCities(provinceName) || [];
    const $citySelect = this.$modalWrap.find('#receiver-city');
    $citySelect.html(this.getSelectOption(cities));
    if (this.option.isUpdate && this.option.data.receiverCity) {
      $citySelect.val(this.option.data.receiverCity);
    }
  },
  // 加载 select 框选项
  getSelectOption(optionArr) {
    let optionHTML = '<option value="">请选择</option>';
    for (let value of optionArr) {
      optionHTML += `<option value=${value}>${value}</option>`;
    }
    return optionHTML;
  },
  // 验证字段
  getReceiverInfo() {
    let receiverInfo = {
      receiverName: '',
      receiverProvince: '',
      receiverCity: '',
      receiverAddress: '',
      receiverZip: '',
      id: ''
    };
    let result = { state: false, data: null, errMsg: '' };
    receiverInfo.receiverName = $.trim(
      this.$modalWrap.find('#receiver-name').val()
    );
    receiverInfo.receiverProvince = $.trim(
      this.$modalWrap.find('#receiver-province').val()
    );
    receiverInfo.receiverCity = $.trim(
      this.$modalWrap.find('#receiver-city').val()
    );
    receiverInfo.receiverAddress = $.trim(
      this.$modalWrap.find('#receiver-address').val()
    );
    receiverInfo.receiverPhone = $.trim(
      this.$modalWrap.find('#receiver-phone').val()
    );
    receiverInfo.receiverZip = $.trim(
      this.$modalWrap.find('#receiver-zip').val()
    );
    receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());
    if (!receiverInfo.receiverName) {
      result.errMsg = '请输入收件人姓名';
    } else if (!receiverInfo.receiverProvince) {
      result.errMsg = '请选择所在省份';
    } else if (!receiverInfo.receiverCity) {
      result.errMsg = '请选择所在城市';
    } else if (!receiverInfo.receiverAddress) {
      result.errMsg = '请输入详细地址';
    } else if (!receiverInfo.receiverPhone) {
      result.errMsg = '请输入的11位手机号码';
    } else {
      result.state = true;
      result.data = receiverInfo;
    }
    return result;
  }
};

export default addressModal;
