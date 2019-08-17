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

  passenger: {
    init: function(){
      let main = $('.count');
      let inc = $('.increment', main);
      let dec = $('.decrement', main);
      let count, countEl, that = this;

      inc.on('click', function(e){
        e.preventDefault();
        let isYouth = $(this).data('youth');
        that.increment(this, isYouth)
      });

      dec.on('click', function(e){
        e.preventDefault();
        let isYouth = $(this).data('youth');
        that.decrement(this, isYouth)
      });

      $('#confirmPassenger').on('click', function(e){
        e.preventDefault();
        let pc = $('.passenger-count');
        let total = parseInt(pc[0].textContent) + parseInt(pc[1].textContent);

        $('.search-header .passenger span').text(total)
        train.popup.hide($('#passenger'));
      })
    },

    increment: function(el, isYouth){
      let countEl = $(el).prev('span');
      let count = parseInt(countEl.text());
      let max = parseInt(countEl.data('max'));
      $(el).parent().find('.decrement').removeClass('disabled');

      if(count < max){
        count++;
        countEl.text(count);
        if(isYouth){
          this.column('add');
        }
      }
      if(count == max){
        $(el).addClass('disabled')
      }
    },
    decrement: function(el, isYouth){
      let countEl = $(el).next('span');
      let count = parseInt(countEl.text());
      let min = parseInt(countEl.data('min'));
      $(el).parent().find('.increment').removeClass('disabled');
      if(count > min){
        count--;
        countEl.text(count);

        if(isYouth){
          this.column();
        }
      }

      if(count == min){
        $(el).addClass('disabled')
      }

    },
    column: function(action){
      let temp = this.template();
      let youth = $('.youth');
      let count = $('.item', youth).length + 1;

      if(action == 'add'){
        youth.append(temp.replace('%%', count++))
      }else{
        youth.find('.item').last().remove()
      }
    },

    template: function(){
      let temp = `
      <div class="item">
        <div class="title">
          Youth <span>%%</span>
        </div>
        <div class="select-wrap">
          <select name="" id="">
            <option hidden="">Age</option>
            <option value="1">1 year</option>
            <option value="1">2 years</option>
            <option value="1">3 years</option>
            <option value="1">4 years</option>
            <option value="1">5 years</option>
            <option value="1">6 years</option>
            <option value="1">7 years</option>
            <option value="1">8 years</option>
            <option value="1">9 years</option>
            <option value="1">10 years</option>
            <option value="1">11 years</option>
            <option value="1">12 years</option>
            <option value="1">13 years</option>
            <option value="1">14 years</option>
            <option value="1">15 years</option>
            <option value="1">16 years</option>
            <option value="1">17 years</option>
            <option value="1">18 years</option>
            <option value="1">19 years</option>
            <option value="1">20 years</option>
            <option value="1">21 years</option>
            <option value="1">22 years</option>
            <option value="1">23 years</option>
            <option value="1">24 years</option>
            <option value="1">25 years</option>
          </select>

          <svg><use xlink:href="#arrow"></use></svg>
        </div>
      </div>
      `;

      return temp;
    }
  },

  dropdown: {
    init: function () {
      let dropdown = $('.dropdown'),
          that = this;

      $('.main', dropdown).on('click', function(e){
        e.preventDefault();
        that.toggle($(this).parent());
      });

      this.select();

      $(document).on('click', function(e){


        if(!$(e.target).parents('.dropdown').exists()){
          that.hide();
        }
      })
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
        let item =  $('.dropdown .item');
        let main, content, that= this;

        item.on('click', function(e){
          e.preventDefault();
          main = $(this).parents('.dropdown');
          content = $(this).text();
          item.removeClass('selected');
          that.hide();
          $('.main span', main).text(content);
          $(this).addClass('selected')
        })
    }
  },

  popup:{
    init: function(){

      let popup = $('.open-popup'),
          opener,
          popupBody,
          that = this,
          close = $('.close-popup');

      popup.on('click touchstart', function(e){
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

      $('.popup-backdrop').on('click', function(e){
        $('.popup.active').addClass('popup-hide');
        setTimeout(function(){
          $('.popup').removeClass('active popup-hide');
          $('.popup-backdrop').removeClass('active');
        },200);
      });
    },
    show: function(popup){
      if(popup.exists()){
        popup.addClass('active');
        $('.popup-backdrop').addClass('active');

        let input = $('.popup-header .input-wrap input', popup);

        if(input.length > 0){
          const fakeInput = document.createElement('input')
          fakeInput.setAttribute('type', 'text')
          fakeInput.style.position = 'absolute'
          fakeInput.style.opacity = 0
          fakeInput.style.height = 0
          fakeInput.style.fontSize = '16px' // disable auto zoom

          // you may need to append to another element depending on the browser's auto
          // zoom/scroll behavior
          document.body.prepend(fakeInput)

          // focus so that subsequent async focus will work
          fakeInput.focus()

          setTimeout(function(){
            $('.popup-header .input-wrap input', popup).focus();
            fakeInput.remove()
          },400);
        }

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
