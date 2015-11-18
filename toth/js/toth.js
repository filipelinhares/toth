'use strict';

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.toth-loader').classList.remove('is-open');

  var codes = document.querySelectorAll('pre code');
  [].forEach.call(codes, function (code) {
    hljs.highlightBlock(code);
  });

  var clipboard = new Clipboard('.js-btn-clipboard', {
    target: function (trigger) {
      return trigger.nextElementSibling
    }
  })

  clipboard.on('success', function(e) {
    e.clearSelection();
  });
});
