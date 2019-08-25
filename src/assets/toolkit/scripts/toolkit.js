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

require('imask');
const AOS = require('aos');


$.extend($.fn.pickadate.defaults, {
  monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: 'aujourd\'hui',
  clear: 'effacer',
  formatSubmit: 'yyyy/mm/dd'
})


var mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#e1f2f9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

window.setMap = function(latlng, iconName, zIndex) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: latlng,
    disableDefaultUI: true,
    styles: mapStyles,
  });


  var icon = {
      url: "../assets/toolkit/images/marker.svg",
      scaledSize: new google.maps.Size(30, 30)
  };

  //var image = 'images/marker.png';
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    icon : icon
  });

  var icon2 = {
      url: "../assets/toolkit/images/marker2.svg",
      scaledSize: new google.maps.Size(20, 20),
      anchor: new google.maps.Point(10, 10)
  };

  //var image = 'images/marker.png';
  var marker = new google.maps.Marker({
    position: {lat: 37.4419, lng: -122.3419},
    map: map,
    icon : icon2
  });


  var line = new google.maps.Polyline({
      path: [
          new google.maps.LatLng(37.4419, -122.3419),
          new google.maps.LatLng(37.4519, -122.1519)
      ],
      strokeColor: "#36506F",
      strokeOpacity: .8,
      strokeWeight: 4,
      map: map
  });
}

var mapKey = 'AIzaSyCQxIklAvcSVuTx8lo_eLAaUTh2rcaiZbk';


window.initMap = function() {

	var latlng = {
		lat: $('#map').data('lat'),
		lng: $('#map').data('lng')
	};

  setMap({lat: 37.4519, lng: -122.1519})
}

if($('#map').exists()){
  $.getScript( "https://maps.googleapis.com/maps/api/js?key="+ mapKey +"&callback=initMap" );
}


$(function(){

  document.addEventListener("touchstart", function(){}, true);

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
  $('.datepicker').pickadate();

  $('.birthday-datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 99, // Creates a dropdown of 15 years to control year,
    max: true
  })

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


  // fake content placeholder
  // TODO: make it dynamic for result

  setTimeout(function(){
    $('.content-placeholder').removeClass('active')
  }, 2000);


  if($('#card-date').exists()){
    var dateMask = IMask(document.getElementById('card-date'),{
      mask: '00/00'
    });
  }


  $('.accordion h3').on('click', function(){
    $(this).parent().toggleClass('active');
  });

  AOS.init({
		 offset: 250,
		 delay: 100,
		 once: true,
		 mirror: true
	});

});
