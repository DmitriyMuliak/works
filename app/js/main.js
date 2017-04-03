var mainjs = (function(){
var mainjs;


// Get Slider General
var $sliderHeader = $('.header-carousel');
var slideCount = null;

// Get Slider News
var $newsSlider = $('.news_slider');

$( document ).ready(function() {

// Humburger menu
$(".header-menu-icon").click(function (e) {
	e.preventDefault();

	// show menu
	$(".gen-menu_mobile").fadeToggle(500);

	// animate humburger lines
	$(".hamburger-gen_top-line").toggleClass("hamburger-gen_top-line-animate");
	$(".hamburger-gen_mid-line").toggleClass("hamburger-gen_mid-line-animate");
	$(".hamburger-gen_bottom-line").toggleClass("hamburger-gen_bottom-line-animate");

	// show background for menu
	$(".header__responsive-menu-bg").toggleClass("header__responsive-menu-bg_active");

	// fixed header
	$(".header").toggleClass("header_js-fixed");

});



// Slider General - options
	$sliderHeader.slick({
		nextArrow: '<i class="header-carousel__arrow header-carousel__next-slide"></i>',
		prevArrow: '<i class="header-carousel__arrow header-carousel__prev-slide"></i>',
		speed: 250,
		swipe: true,
		swipeToSlide: true,
		touchThreshold: 10,
	});
// Slider News - options || function for reinit
function StartNewsSlider(){
	$newsSlider.slick({
	dots: false,
	infinite: false,
	speed: 300,
	arrows: false,
	appendDots: '.news__nav-dots',
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 749,
			settings: 'unslick'
		}
	]
	});
}

// Show caption of portfolio item
	var portfolioItem = $('.portfolio__item-wrapper');

	portfolioItem.on("mouseover mouseout", function(){
		$(this).toggleClass("portfolio__item-wrapper_js-hover");
		$(this).find('.portfolio__item-title').toggleClass("portfolio__item-title_js-hover");
		$(this).find('.portfolio__title-lines').toggleClass("portfolio__title-lines_js-hover");
		$(this).find('.portfolio__item-desc').toggleClass("portfolio__item-desc_js-hover");
		$(this).find('.portfolio__item-read-more').toggleClass("portfolio__item-read-more_js-hover");
		$(this).find('.portfolio__item-link').toggleClass("portfolio__item-link_js-hover");
	});


// Show || Hide search
var headerSearhIcon = $('.header-search__icon'),
	searchForm = $('.search-form_hidden'),
	searchFormCloseLines = $('.search-form__close-lines'),
	headerWrapTopSection = $('.header__wrap-top-sections');

function hideSearch(){
	headerSearhIcon.toggleClass('header-search__icon_open');
	headerWrapTopSection.toggleClass('header__wrap-top-sections_js-borcolor');
	searchForm.slideToggle();
}

headerSearhIcon.on('click', hideSearch);
searchFormCloseLines.on('click', hideSearch);


// Move label on contact form
var formInput = $('.form__input');

formInput.each(function(){
	var label = $(this).siblings('.form__label');
	$(this).focus(function(){
		label.addClass('form__label_focus-js');
	});
	$(this).focusout(function(){
		if($(this).val()){return;}
		label.removeClass('form__label_focus-js');
	});
});

/* Add placeholder*/
$('input, textarea').each(function(){
	var placeholder = $(this).attr('placeholder');
	$(this).focus(function(){ $(this).attr('placeholder', '');});
	$(this).focusout(function(){
	$(this).attr('placeholder', placeholder);
	});
});
/* Add placeholder*/

// Check viewport for Init News slider
var $newsSliderI = $('.news_slider');
$(window).resize(function() {
	if($(document).width() >= 750 && $newsSliderI.hasClass('slick-initialized') === false){
		StartNewsSlider();
	}
});


});



// Add counter of slides for General Slider 
$sliderHeader.on('init', function(event, slick){
	slideCount = slick.slideCount;
	setSlideCount();
	setCurrentSlideNumber(slick.currentSlide);
});

$sliderHeader.on('beforeChange', function(event, slick, currentSlide, nextSlide){
	setCurrentSlideNumber(nextSlide);
});

function setSlideCount() {
	var $el = $('.header-carousel__slide-count-wrap').find('.slide-counter__total');
	$el.text(slideCount);
}

function setCurrentSlideNumber(currentSlide) {
	var $el = $('.header-carousel__slide-count-wrap').find('.slide-counter__current');
	$el.text(currentSlide + 1);
}


	return mainjs;
	//main.init
})();