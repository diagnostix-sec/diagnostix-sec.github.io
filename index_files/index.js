// open mobile menu
$('.js-toggle-menu').click(function(e){
  e.preventDefault();
  $('.mobile-header-nav').slideToggle();
  $(this).toggleClass('open');
});



// Content Fade In Animation
var animateOnce = true;
var distanceTrigger = 4;
//this is the distance from the bottom of the page that determines the trigger - 4 is 1/4 from the bottom while 2 would be 1/2 from the bottom and 0 would be the very bottom

var windowHeight;
var windowWidth;
var objectLead;
var scrollAlertOffsets = Array();
var scrollAlertObjects = Array();


jQuery(window).on("load", function(){

	getWindowDimensions();
	scrollAlertSetup();
	setupResizeEvents();
	setupScrollTop();
	setupAnimationEvents();

	setupHeroAnimation();
	setupHowItWorks();

});

function setupAnimationEvents(){

	requestAnimationFrame(scrollAlert);

}

function setupResizeEvents(){

	jQuery(window).resize(function(){

		getWindowDimensions();

	});

}

function scrollAlertSetup(){

  scrollAlertOffsets = Array();
  scrollAlertObjects = Array();

	jQuery(".scroll-alert").each(function(){

		var scrollObject = jQuery(this);

		scrollAlertObjects.push(scrollObject);
		scrollAlertOffsets.push(scrollObject.offset().top);

	});

	scrollAlert();

}

function scrollAlert(){

	var windowOffset = jQuery(window).scrollTop();

	for(var i = 0; i < scrollAlertOffsets.length; i++){

		if(windowOffset + windowHeight > scrollAlertOffsets[i] + objectLead){
			scrollAlertObjects[i].addClass("active");
	    }else{
	      if(!animateOnce)
				  scrollAlertObjects[i].removeClass("active");
	    }

	}

	requestAnimationFrame(scrollAlert);

}

function getWindowDimensions(){

	windowHeight = jQuery(window).height();
	windowWidth = jQuery(window).width();
	objectLead = windowHeight/distanceTrigger;

}

function setupHeroAnimation(){

	if(jQuery('#animate-hero').length === 0) return false;

	let counter = 0;

	homepageHeroTransition(counter);
}

function homepageHeroTransition(counter){

	let timingArray = [50, 50];

	setTimeout(function(){

		jQuery('#animate-hero > img:eq('+counter+')').addClass('fade-out');

		counter++;

		if(counter <= 1)
			homepageHeroTransition(counter);

	}, timingArray[counter]);

}

function setupScrollTop(){

	jQuery(window).scroll(function(){

		windowOffset = jQuery(window).scrollTop();

		if(windowOffset > windowHeight)
			jQuery("html").addClass("enable-quick-scroll");
		else
			jQuery("html").removeClass("enable-quick-scroll");

	});

	jQuery(".quick-scroll").on("click", function(){
		jQuery("html, body").animate({scrollTop: 0}, "slow");
		return false;
	});

	jQuery(".button1").on("click", function(){
		jQuery("html, body").animate({scrollTop: $(document).height()}, "slow");
		return false;
	});

}
