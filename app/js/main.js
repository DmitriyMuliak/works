$(function(){
	$('.collapse').on('show.bs.collapse',function(){
		$(this).prev().find('.fa').removeClass().addClass('fa fa-minus-circle');
	});
	$('.collapse').on('hide.bs.collapse',function(){
		$(this).prev().find('.fa').removeClass().addClass('fa fa-plus-circle');
	});

	$('#form-register').validator();

	$('.selectpicker').selectpicker({
		showIcon: false
	});

// Initialize wow.js
	var wow = new WOW({
		offset:        100,// default 0
		mobile:        false,// default true
		live:          false// default true
	}).init();


// Initialize Google Map
function init_map() {
	var var_location = new google.maps.LatLng(-33.868787, 151);//45.430817,12.331516.209305

	var var_mapoptions = {
		center: var_location,
		zoom: 11,
		scrollwheel: false
	};

	var var_marker = new google.maps.Marker({
		position: var_location,
		map: var_map,
		title:"Syndney"});

	var var_map = new google.maps.Map(document.getElementById("map-container"),
		var_mapoptions);

	var_marker.setMap(var_map); 

}

google.maps.event.addDomListener(window, 'load', init_map);

});
