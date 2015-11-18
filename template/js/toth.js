'use strict';

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.toth-loader').classList.remove('is-open');

  var codes = document.querySelectorAll('pre code');
  [].forEach.call(codes, function (code) {
    hljs.highlightBlock(code);
  });

  var clipboard = new Clipboard('.js-btn-clipboard', {
    target: function (trigger) {
      return trigger.nextElementSibling;
    }
  });

  clipboard.on('success', function (e) {
    e.clearSelection();
    e.trigger.classList.add('is-ok');

    setTimeout(function () {
      e.trigger.classList.remove('is-ok');
    }, 1000);
  });

  clipboard.on('error', function (e) {
    e.clearSelection();
    e.trigger.classList.add('is-not-ok');

    setTimeout(function () {
      e.trigger.classList.remove('is-not-ok');
    }, 1000);
  });
});
