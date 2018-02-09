import _mm from 'util/_mm.js';
import '../common/nav-simple/index.js';
import './index.scss';

$(() => {
  const type = _mm.getURLParam('type') || 'default';
  const $element = $(`.${type}-success`);
  $element.show();
});
