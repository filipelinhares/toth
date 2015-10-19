'use strict';
var Doki = Doki || {};

fetch('./index.json')
  .then((data) => {
    return data.json();
  })
  .then((jsonParsed) => {
    Doki.content = jsonParsed;
    $('#app').trigger('ready');
  })
  .catch((err) => {
    console.error(err);
  });

$(function () {
  var body   = $("#app").html();
  var menu   = $('#menu').html();
  var bodyTemplate = Handlebars.compile(body);
  var menuTemplate = Handlebars.compile(menu);

  $('#app').on('ready', function () {
    var body = bodyTemplate(Doki.content);
    $('.toth-guide-body').append(body);
    var menu = menuTemplate(Doki.content);
    $('.toth-navbar-menu').append(menu);

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    Doki.content.forEach(function (cont) {
      if (cont.cssurl) loadCSS(cont.cssurl);
      if (cont.jsurl)  loadJS(cont.jsurl);
    });
  });
});

