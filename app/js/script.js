$(document).ready(function(){

	var locationHash = window.location.hash;
	if(locationHash && locationHash.indexOf('tab') != 1){ // off go hash in tabs & accordions
		navScroll.showSection(locationHash,false);		  // they have class with start "tab..."
	}else if(locationHash === ""){
		navScroll.checkSection();
	}

	// Add listeners for navigation
	$('.main-navigation a').on('click',function(e){
		//e.preventDefault();
		navScroll.showSection($(this).attr('href'),true);
	})

	$('a.arrow').on('click',function(e){
		//e.preventDefault();
		navScroll.showSection($(this).attr('href'),true);
	})

	// Active tabs
	$('.tab-container').easytabs({
		defaultTab:'li:nth-child(1)'
	});

	// Active accordion
	simpleAccord.showSection();

	// Active Slider
	$("#css3dimagePager li").click(function(){
		var rotateY = ($(this).index() * -90); 
		$("#css3dimageslider ul").css({"-webkit-transform":"rotateY("+rotateY+"deg)", "-moz-transform":"rotateY("+rotateY+"deg)", "-ms-transform":"rotateY("+rotateY+"deg)", "transform":"rotateY("+rotateY+"deg)"});
		$("#css3dimagePager li").removeClass("active");
		$(this).addClass("active");
	});
	$("#css3dtransparency").click(function() {
		$("#css3dimageslider").toggleClass("transparency");
		$(this).toggleClass("active");
		
		var togClass = $(this).hasClass("active");
		if(togClass !== true){
			$(this).text("Click to hide discription");
		}else{
			$(this).text("Click to show discription");
		}
	});

	// Active animation
	var wow = new WOW(
	{
		boxClass:     'wow',      // default wow
		animateClass: 'animated', // default animated
		offset:       0,          // default 0
		mobile:       false,       // default true
		live:         false        // default true
	})
	wow.init();

}); // ready end


$(window).scroll(function(){
	navScroll.checkSection();
}); // scroll end



/*  Nav Scroll module 
======================================================================*/

var navScroll = (function(){

// privet
var navScroll = {};

// publick
navScroll.showSection = function (section,isAnimate){ //section,flag

		var
		direction = section.replace(/#/,''),
		reqSection = $('section').filter('[data-section="' + direction + '"]'),
		reqSectionPos = reqSection.offset().top;

		if(isAnimate){
			$('body, html').stop(true).animate({scrollTop:reqSectionPos},500);
		}else{
			$('body, html').scrollTop(reqSectionPos);
		}

}

navScroll.checkSection = function (){
	$('section').each(function(){
		var
			$this = $(this),
			topEndge = $this.offset().top,
			BottomEndge = topEndge + $this.height(),
			//were is scroll // padding for header 71px
			wScroll = $(window).scrollTop() + 71;
			// if we on section
			if(topEndge <= wScroll && BottomEndge > wScroll){
				var 
					currentId = $this.data('section'),
					reqLink = $('.main-navigation a').filter('[href="#' + currentId + '"]');

					reqLink.closest('li').addClass('active').siblings().removeClass('active');
			}
	})
}

return navScroll;
})();


/*  Simple Accordion
======================================================================*/

var simpleAccord = (function(){

// privet
var simpleAccord = {};

// publick
simpleAccord.showSection = function(){


	$('.accordion_trigger').on('click', function(e){
		e.preventDefault();

		var $this = $(this),
		item = $this.closest('.accordion_item'),
		list = $this.closest('.accordion_list'),
		items = list.find('.accordion_item'),
		content = item.find('.accordion_inner-item'),
		otherConetent = list.find('.accordion_inner-item'),
		duration = 300;

		if(!item.hasClass('active')){
			items.removeClass('active');
			item.addClass('active');

			otherConetent.stop(true).slideUp(duration);
			content.slideDown(duration);
		}else if(item.hasClass('active')){
			content.slideUp(duration);
			item.removeClass('active');
		}

	})
}

return simpleAccord;
})();