/*!
 * Train
 * Copyright 2019 train.ma | @Train
 */

module.exports = {
  name    : 'Train',
  version : '0.0.1',
  url     : 'http://train.ma',
  author  : 'Arif Cakiroglu <arif@linux.com>',

  init : function (options) {
    this.settings = $.extend({}, this.default, options);
    return this
  },

  cumulativeOffset : function(elem) {
     var box = elem[0].getBoundingClientRect();
     var body = document.body;
     var docEl = document.documentElement;

     var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
     var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

     var clientTop = docEl.clientTop || body.clientTop || 0;
     var clientLeft = docEl.clientLeft || body.clientLeft || 0;

     var top  = box.top +  scrollTop - clientTop;
     var left = box.left + scrollLeft - clientLeft;

     return { top: Math.round(top), left: Math.round(left) };
  },

  dropdown: {
    init: function () {
      let dropdown = $('.dropdown'),
          that = this;

      $('.main', dropdown).on('click', function(e){
        e.preventDefault();
        that.toggle($(this).parent());
      });
    },

    open: function(dropdown){
      $(dropdown).addClass('active');
    },

    hide: function(){
      $('.dropdown').removeClass('active');
    },

    toggle: function(dropdown) {
      dropdown.toggleClass('active')
    },

    select: function(){

    }
  },

  popup:{
    init: function(){

      let popup = $('.open-popup'),
          opener,
          popupBody,
          that = this,
          close = $('.close-popup');

      popup.on('click', function(e){
        e.preventDefault();
        opener = $(this).data('popup');
        popupBody = $(`#${opener}`);
        that.show(popupBody);
      });

      close.on('click', function(e){
        e.preventDefault();
        opener = $(this).data('popup');
        popupBody = $(`#${opener}`);
        that.hide(popupBody);
      });
    },
    show: function(popup){
      if(popup.exists()){
        popup.addClass('active');
        $('.popup-backdrop').addClass('active');
        setTimeout(function(){
          $('.popup-header .input-wrap input', popup).focus();
        },200);
      }
    },
    hide: function(popup){
      if(popup.exists()){
        popup.addClass('popup-hide');
        setTimeout(function(){
          popup.removeClass('active popup-hide');
          $('.popup-backdrop').removeClass('active');
        },200);

      }
    }
  }
}
