import _mm from 'util/_mm.js';
import '../common/nav-simple/index.js';
import './index.scss';

$(() => {
  const type = _mm.getURLParam('type') || 'default';
  const $element = $(`.${type}-success`);
  const $payment = $(`.${type}-success`).find('.order-number');
  let orderNumber = _mm.getURLParam('orderNumber');

  if (type === 'payment') {
    $payment.attr('href', $payment.attr('href') + orderNumber);
  }
  $element.show();
});
