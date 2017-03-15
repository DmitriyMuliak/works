$(function(){
	$('.carousel').carousel({
		interval: false
	});

// Show search
	$('.search-hide').on('click', function(){
		$('.main-menu .navbar-right').slideToggle();
	});

// Call bottom carousel
	$('#elastislide').elastislide(
		{
			minItems : 2
		}
	);

});