$(function () {

	$(window).stellar({
		horizontalScrolling: false
	});

	// Custom Scrollbar
	var nice = $("html").niceScroll({
		cursorwidth: 8,
		cursorborder: "0px solid #fff",
		cursorborderradius: '0'
	});

	$('.main-nav a:not(.dropdown-toggle)').bind('click', function(event) {
		var $anchor = $(this);

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');

		event.preventDefault();
	});
	/*
	* Fun Fact with Count Animation
	*/
	$('.st-ff-count').appear();
	$(document.body).on('appear', '.st-ff-count', function(e, $affected) {
		$affected.each(function(i) {
			if (parseInt($(this).data('runit'))) {
				$(this).countTo({
					speed: 3000,
					refreshInterval: 50
				});
				$(this).data('runit', "0");
			};

		});
	});

	$('[data-toggle="tooltip"]').tooltip();




    function home_height () {
		var element = $('.st-home-unit'),
			elemHeight = element.height(),
			winHeight = $(window).height()
			padding = (winHeight - elemHeight - 200) /2;

		if (padding < 1 ) {
			padding = 0;
		};
		element.css('padding', padding+'px 0');
	}
	home_height ();

	$(window).resize(function () {
		home_height ();
	});


	var fadeStart=$(window).height()/3 // 100px scroll or less will equiv to 1 opacity
    ,fadeUntil=$(window).height() // 200px scroll or more will equiv to 0 opacity
    ,fading = $('.st-home-unit')
    ,fading2 = $('.hero-overlayer')
	;

	$(window).bind('scroll', function(){
	    var offset = $(document).scrollTop()
	        ,opacity=0
	        ,opacity2=1
	    ;
	    if( offset<=fadeStart ){
	        opacity=1;
	        opacity2=0;
	    }else if( offset<=fadeUntil ){
	        opacity=1-offset/fadeUntil;
	        opacity2=offset/fadeUntil;
	    }
	    fading.css({'opacity': opacity});

	    if (offset >= 120) {
	    	$('.st-navbar').addClass("st-navbar-mini");
	    } else if (offset <= 119) {
	    	$('.st-navbar').removeClass("st-navbar-mini");
	    }
	});




	/*
     * Contact Form Validation Code
     */
    function checkEmpty(selector) {
        if (selector.val()=="" || selector.val()==selector.prop("placeholder")) {
          selector.addClass('formFieldError',500);
          return false;
        } else {
          selector.removeClass('formFieldError',500);
          return true;
        }
    }
    function validateEmail(email) {
        var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        if (!regex.test(email.val())) {
          email.addClass('formFieldError',500);
          return false;
        } else {
          email.removeClass('formFieldError',500);
          return true;
        }
    }

    
});


$(window).load(function () {
	var $grid = $('.grid'),
		$sizer = $grid.find('.shuffle__sizer'),
		$filterType = $('#filter input[name="filter"]');

	$grid.shuffle({
		itemSelector: '.portfolio-item',
		sizer: $sizer
	});

	$filterType.change(function(e) {
		var group = $('#filter input[name="filter"]:checked').val();

		$grid.shuffle('shuffle', group);

		$('label.btn-main').removeClass('btn-main');
		$('input[name="filter"]:checked').parent().addClass('btn-main');
	});
});
