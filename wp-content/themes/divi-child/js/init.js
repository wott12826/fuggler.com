/**
 * Init js
 * Version 1.0
 **/

function initJs($) {

	(this.owlCarouselJs = function () {
		let _this = this;
		$(".home_banner_slider").owlCarousel({
			loop:true,
			margin:20,
			nav:false,
			dots: true,
			navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
			autoplay: true,
			autoplayTimeout:5000,
			smartSpeed: 2000,
			responsive:{
				0:{
					items:1,
				}
			}
		});
		$(".tab_slider_wrapper").owlCarousel({
			loop:true,
			margin:20,
			nav:false,
			dots: true,
			navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
			autoplay: false	,
			autoplayTimeout:5000,
			smartSpeed: 500,
			responsive:{
				0:{
					items:2.3,
				},
				768:{
					items:3.4,
				},
				980:{
					items:4.3,
				},
				1080:{
					items:5.3,
				},
				1200:{
					items:5.5,
				},
			}
		}).on('click', '.owl-item', function () {
			let id = $(this).find('.btn_tab').data('term-id');
			if (id != '') {
				$('.tab_content_wrapper').removeClass('tab_active'); 
				$('#tab_' + id).addClass('tab_active'); 
			}
		});
		$(".news_slider").owlCarousel({
			loop:true,
			nav:false,
			dots: true,
			navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
			autoplay: false	,
			autoplayTimeout:5000,
			smartSpeed: 2000,
			responsive:{
				0:{
					margin:15,
					items:1.2,
				},
				768:{
					margin:30,
					items:1.2,
				},
				981:{
					margin:15,
					items:1,
				},
			}
		});
	}),
	(this.fugglersPopupJs = function(){
		$("a.popup_btn").click(function(){
			$("#fuggler-popup").addClass("active_popup");
			$("body").addClass("active_fugglers_popup");
		});

		$(document).on('click', '#btn_close', function(e) {
			e.preventDefault();
			$("#fuggler-popup").removeClass("active_popup");
			$("body").removeClass("active_fugglers_popup");
		});
		$('#fuggler-popup .overlay_').on('click', function(){
			$("#fuggler-popup").removeClass("active_popup");
			$("body").removeClass("active_fugglers_popup");
		});
	}),
	(this.fugglersModalAjaxJS = function() {
		$(document).on('click', 'a.popup_btn', function(e) {
			e.preventDefault();

			var 
			id     = $(this).data('id');

			if(!id) return false;

			$.ajax({
				url: ajax_url,
				type: 'POST',
				dataType: 'html',
				data: {action: 'fuggler_details_popup_ajax', id:id},
				beforeSend: function() {
					// $('#fuggler-popup .modal').css({'background': 'transparent'});
					$('#fuggler-popup .modal').html('<div class="loader"></div>');
				},
				success: function(message) {
					// $('#fuggler-popup .modal').css({'background': 'url('+modal_bg_image+')'});
					$('#fuggler-popup .modal').html(message);
				},
				failed: function() {
					// $('#fuggler-popup .modal').css({'background': 'url('+modal_bg_image+')'});
					$('#fuggler-popup .modal').html('<p>Error Occured!</p>');
				}
			})
		});
	}),
	(this.menuCloseJs = function() {
		$( "#mobile_menu" ).append( "<span class='menu_close_button'></span>" );
		$('.menu_close_button').click(function() {
			$('.mobile_nav').removeClass('opened');
			$('.mobile_nav').addClass('closed');
		});

	}),
	(this.headerMobileMenu = function(){
		$('div#et_mobile_nav_menu span.mobile_menu_bar.mobile_menu_bar_toggle').click(function(){
			$('body').addClass('mobile_menu_active');
		});
		$('ul#mobile_menu span.menu_close_button').click(function(){
			$('body').removeClass('mobile_menu_active');
		});
	}),
	(this.fuggTv = function(){
		$(document).on('click','.text-meet',function(){
			$('.text-meet').removeClass('active');
			$('.playBtn').addClass('hide');
			$(this).addClass('active')
			var video_url=$(this).attr('video-url');
			const url_array = video_url.split("=");
			var video_key=url_array[1];
			document.getElementById("video-playback").src = "https://www.youtube.com/embed/" + video_key + "?si=CG40NAx138v35oZV&autoplay=1&rel=0";
		});

		$(document).on('click','.playBtn',function(){
			$('.text-meet:nth-child(1)').addClass('active');
			$(this).addClass('hide')
			const video = document.getElementById("video-playback");
			var video_url= video.getAttribute('src');
			video.src =  video_url + "&autoplay=1";
		});

		$(document).on('click','.puase-image',function(){
			$(this).addClass('hide')
			const video = document.getElementById("video-playback");
			var video_url= video.getAttribute('src');
			video.src =  video_url + "&autoplay=1";
		});
	}),
	
	(this.init = function () {
		this.owlCarouselJs();
		this.fugglersPopupJs();
		this.fugglersModalAjaxJS();
		this.menuCloseJs();
		this.headerMobileMenu();
		this.fuggTv();
		$(window).on('load resize', function(){
			let winWidth = $(window).innerWidth();
			setTimeout(function(){
				let firstActiveItem = $('.news_slider .owl-item.active .content_wrapper').innerWidth();

				if(winWidth < 768){
					$('.news_slider .owl-nav button.owl-next').css('left', firstActiveItem+'px');
				}else if (winWidth < 980){
					$('.news_slider .owl-nav button.owl-next').css('left', firstActiveItem+5+'px');
				} else{
					$('.news_slider .owl-nav button.owl-next').css('left', firstActiveItem+94+'px');
				}
			}, 1000);
		});
	});
}

try {
	jQuery(function ($) {
		let initObj = new initJs($);
		initObj.init();
	});
} catch (err) {
	console.log(err.message);
}



