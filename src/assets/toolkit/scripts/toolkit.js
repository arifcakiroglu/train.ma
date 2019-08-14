/*!
 * Train
 * Copyright 2019 train.ma | @Train
 */

'use strict';

var $ = require('expose?$!expose?jQuery!jquery');

jQuery.fn.exists = function(){ return this.length > 0; }

let train = window.train  = require("./train");
const pickadate = require("pickadate/lib/picker.date");
$.extend($.fn.pickadate.defaults, {
  monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: 'aujourd\'hui',
  clear: 'effacer',
  formatSubmit: 'yyyy/mm/dd'
})


$(function(){

  // Get icons
  $.get("/assets/toolkit/images/icons/sprite.svg?v=1", function(data) {
    let div = document.createElement("div");
    div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    document.body.insertBefore(div, document.body.childNodes[0]);
  });
  // Get icons

  // Mobile menu
  var openMenu =  function(){
    $('html').addClass('with-panel-left-reveal');
    $('body').addClass('left-panel-active');
  };

  $(".menu-icon").on('click', function (e) {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      openMenu();
    }
  });

	$(".panel-overlay, .close-panel").on('click', function () {
		$('html').removeClass('with-panel-left-reveal');
		setTimeout(function () {
			$('body').removeClass('left-panel-active');
		}, 400);
	});
  // Mobile menu


  //popups
  train.popup.init();


  // datepicker
  $('.datepicker').pickadate()

  // dropdown
  train.dropdown.init();
});
