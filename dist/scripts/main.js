$(document).ready(function(){var i=window.location.hash;i&&1!=i.indexOf("tab")?navScroll.showSection(i,!1):""===i&&navScroll.checkSection(),$(".main-navigation a").on("click",function(i){navScroll.showSection($(this).attr("href"),!0)}),$("a.arrow").on("click",function(i){navScroll.showSection($(this).attr("href"),!0)}),$(".tab-container").easytabs({defaultTab:"li:nth-child(1)"}),simpleAccord.showSection(),$("#css3dimagePager li").click(function(){var i=$(this).index()*-90;$("#css3dimageslider ul").css({"-webkit-transform":"rotateY("+i+"deg)","-moz-transform":"rotateY("+i+"deg)","-ms-transform":"rotateY("+i+"deg)",transform:"rotateY("+i+"deg)"}),$("#css3dimagePager li").removeClass("active"),$(this).addClass("active")}),$("#css3dtransparency").click(function(){$("#css3dimageslider").toggleClass("transparency"),$(this).toggleClass("active"),$(this).hasClass("active")!==!0?$(this).text("Click to hide discription"):$(this).text("Click to show discription")}),new WOW({boxClass:"wow",animateClass:"animated",offset:0,mobile:!1,live:!1}).init()}),$(window).scroll(function(){navScroll.checkSection()});var navScroll=function(){var i={};return i.showSection=function(i,t){var o=i.replace(/#/,""),a=$("section").filter('[data-section="'+o+'"]'),e=a.offset().top;t?$("body, html").stop(!0).animate({scrollTop:e},500):$("body, html").scrollTop(e)},i.checkSection=function(){$("section").each(function(){var i=$(this),t=i.offset().top,o=t+i.height(),a=$(window).scrollTop()+71;if(t<=a&&o>a){var e=i.data("section");$(".main-navigation a").filter('[href="#'+e+'"]').closest("li").addClass("active").siblings().removeClass("active")}})},i}(),simpleAccord=function(){var i={};return i.showSection=function(){$(".accordion_trigger").on("click",function(i){i.preventDefault();var t=$(this),o=t.closest(".accordion_item"),a=t.closest(".accordion_list"),e=a.find(".accordion_item"),s=o.find(".accordion_inner-item"),c=a.find(".accordion_inner-item");o.hasClass("active")?o.hasClass("active")&&(s.slideUp(300),o.removeClass("active")):(e.removeClass("active"),o.addClass("active"),c.stop(!0).slideUp(300),s.slideDown(300))})},i}();