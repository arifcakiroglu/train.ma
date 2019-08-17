/*!
 * Train
 * Copyright 2019 train.ma | @Train
 */

'use strict';

var $ = require('expose?$!expose?jQuery!jquery');

jQuery.fn.exists = function(){ return this.length > 0; }

let train = window.train  = require("./train");
const pickadate = require("pickadate/lib/picker.date");
const autoComplete = require('./components/autocomplete');



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


  //Passengers
  train.passenger.init();


  //autocomplete

  new autoComplete({
    selector: 'input[name="from"]',
    minChars: 1,
    menuClass: 'from-autocomplete',
    source: function(term, suggest){
        // docs: https://goodies.pixabay.com/javascript/auto-complete/demo.html
        // Todo: make it dynamic
        // try { xhr.abort(); } catch(e){}
        // xhr = $.getJSON('/some/ajax/url/', { q: term }, function(data){ response(data); });


        term = term.toLowerCase();
        var choices = [
          'Paris, France',
          'Paris Charles de Gaulle Airport (CDG)',
          'Paris Gare de Lyon',
          'Par (PAR)',
          'Par, United Kingdom',
          'Paris Gare du Nord',
          'Paris Gare Montparnasse',
          'Paris Orly Airport (ORY)',
          'Paris Gare de l\'Est',
          'Pare, Italy',
          'Pare, Indenosia'
        ];
        var matches = [], i;
        for (i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    },
    onSelect: function(e, term, item){
      train.popup.hide($('#from'));
      $('#fromField').val(term)
    }
  });


  new autoComplete({
    selector: 'input[name="to"]',
    minChars: 1,
    menuClass: 'to-autocomplete',
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = [
          'Paris, France',
          'Paris Charles de Gaulle Airport (CDG)',
          'Paris Gare de Lyon',
          'Par (PAR)',
          'Par, United Kingdom',
          'Paris Gare du Nord',
          'Paris Gare Montparnasse',
          'Paris Orly Airport (ORY)',
          'Paris Gare de l\'Est',
          'Pare, Italy',
          'Pare, Indenosia'
        ];
        var matches = [], i;
        for (i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    },
    onSelect: function(e, term, item){
      train.popup.hide($('#to'));
      $('#toField').val(term)
    }
  });

  $('.results .more-info').on('click', function(){
    $(this).parents('.item').toggleClass('journey-view')
  });


  if($('.results').exists()){
    $('.page-content').one('scroll', function(e){
      $('.filter-bar').addClass('active');
    })
  }

});
