$(window).on('load', function(){
	$('body').addClass('active')
});


$(document).ready(function(){
// GET URL OF CURRENT PAGE
var url = window.location.href,
	current = url.split('/'),
	pgurl = current[current.length - 2];
	// console.log(url)
	// console.log(current)
	// console.log(pgurl);
	// console.log(pgurl)

	// // CHECK IF CURRENT PAGE IS SUB DIRECTORY OF MAIN NAV
	if( $('a[href*="' + pgurl + '"]').parents('.subNavigation').length) {
		$('a[href*="' + pgurl + '"]').parents().eq(2).addClass('active');
	} else {
		$('a[href*="' + pgurl + '"]').parent().addClass('active');
	}

// GENERIC FUNCTIONS

	// PLUGIN TO ADD CLEARFIX CLASS TO PARENTS OF ELEMENTS CALLED
	$.fn.clearfix = function() {
		this.parent().addClass('clearfix');
	}
	$('.fl, .fr').clearfix();
	// END CLEARFIX PLUGIN
	// ADD POSITION RELATIVE TO PARENTS OF ANCHORBOTTOM
	$.fn.positionRelative = function() {
		this.parent().css({
			'position' : 'relative'
		});
		var height = this.height();
		this.css({
			'height': height + 'px'
		});
		this.find('> img:first-child').css({
			'height' : height + 'px'
		});
	}
	$('.anchorBottom, .posa, .posr, .poss, .posf').each(function(){
		$(this).positionRelative();
	})
	$(window).resize(function(){
		$('.anchorBottom, .posa, .posr, .poss, .posf').each(function(){
			$(this).positionRelative();
		})
	})
	// START EQUAL HEIGHT PLUGIN
	equalheight = function(container){

	var currentTallest = 0,
	     currentRowStart = 0,
	     rowDivs = new Array(),
	     $el,
	     topPosition = 0;
	 $(container).each(function() {

	   $el = $(this);
	   $($el).height('auto')
	   topPostion = $el.position().top;

	   if (currentRowStart != topPostion) {
	     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	       rowDivs[currentDiv].height(currentTallest);
	     }
	     rowDivs.length = 0; // empty the array
	     currentRowStart = topPostion;
	     currentTallest = $el.height();
	     rowDivs.push($el);
	   } else {
	     rowDivs.push($el);
	     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  }
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	     rowDivs[currentDiv].height(currentTallest);
	   }
	 });
	}

	$.fn.riseHeight = function(){
		var height = this.parent().siblings().height();
		this.parent().css({
			'height' : 'calc(' + height + 'px)'
		});
		this.css({
			'height' : 'calc(' + height + 'px + 2rem)',
			'top' : '-2rem'
		})
	}
	// END EQUAL HEIGHT PLUGIN
	// START DYNAMIC DATE FOR FOOTER
	$.fn.currentYear = function(){
		var currentYear = new Date().getFullYear();
		this.text(currentYear);
	}
	$('.copyright span').currentYear();
	// END DYNAMIC DATE FOR FOOTER
	// START MODAL PLUGIN
	$.fn.loadModal = function(){
		this.on('click', function(){
			var video = $(this).attr('data-video');
			$('.modal').addClass('active');
			// console.log(video)

			if(video.length) {
				$('.modalItem').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + video + '?rel=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>');
				function videoHeight(){
					var iframe = $('.modalItem > iframe'),
						width = iframe.width(),
						height = (width / 16) * 9;
					
					iframe.css({
						'height' : height + 'px'
					}).parent().css({
						'width' : width + 50 + 'px',
						'height' : height + 75 + 'px'
					});
				}
				setTimeout(videoHeight, 100);

				$('.modalClose').on('click', function(){
					$(this).siblings().remove();
					$(this).parents().eq(1).removeClass('active');
				});
			};

		});
	}
	$('.videoModal').loadModal();
	// END MODAL PLUGIN
	// START NEWS STORY PADDING ON SIDEBAR
	function newsStory(){
		if($('.newsStory').length) {
			var top = $('.newsStory > div').offset().top,
				topNav = $('nav').height(),
				pt = $('.sidebarSection').css('padding-top'),
				pt = pt.replace(/px/g, ''),
				pt = parseInt(pt),
				height = top - (pt + topNav);
			$('#newsStorySidebar').css({
				'top' : 'calc(' + height + 'px - 2.5rem)'
			});
		}
	}
	// END NEWS STORY PADDING ON SIDEBAR
// END GENERIC SCRIPTS
// ----------------
// START NAVIGATION

$.fn.addClassActive = function(){
	this.on('click', function(){
		$(this).toggleClass('active');
	});
}

// DESKTOP NAVIGATION
function navDesktop(){
	var nav = $('.navigation');

	// ADD A DIV TO THE SUBNAV TO CREATE THE SHADOW BEHIND IT
	$('.subNavigation').each(function(n){

		// GET HEIGHT OF NAV AND THE UL BELOW IT
		var currentHeight = $(this).height(),
			subnavHeight = $(this).siblings('p').height(),
			height = subnavHeight + currentHeight;

			// console.log(currentHeight + '////' + subnavHeight + '////'  + height + '////' + n)

		// APPEND DIV WITH SAID HEIGHT
		$(this).parent().append('<div style="height: calc(' + height + 'px + 1.5rem);" class="dropdownShadow"></div>');
	})

	// START SLIDETOGGLE NAVIGATION
	$(document).click(function(){
		// REMOVE NAVIGATION ON CLICK OF DOCUMENT
		var ul = nav.find('ul.active'),
			p = nav.find('p.active'),
			div = nav.find('div.active');
		
		ul.removeClass('active').slideUp();
		p.removeClass('active');
		div.removeClass('active');
	});
	nav.find('p').on('click', function(e){
		var navigation = $(this);

		$(this).toggleClass('active').siblings('div').toggleClass('active').siblings('ul').slideToggle().toggleClass('active');
		$(this).parent().siblings().find('.subNavigation').slideUp().removeClass('active').siblings().removeClass('active');
		e.stopPropagation();
		return false; 
	});

	// START FLUID NAVIGATION BAR ON HOVER
	if(nav.find('li.active').length) {
		var bar = $('.navigationHover'),
			active = nav.find('li.active'),
			activeWidth = active.width(),
			activeHalf = activeWidth / 2,
			activeLeft = active.position().left,
			activeCenter = activeLeft + activeHalf,
			activePad = active.find('> p, > a').css('padding-left');

		bar.css({
			'left' : 'calc(' + activeCenter + 'px - ' + activePad + ')'
		});
	}

	// bar.css({

	// })

	$('.navigation > li').on({
		mouseenter : function(){
			var leftPos = $(this).position().left,
				navWidth = $(this).parent().width(),
				width = $(this).width(),
				widthHalf = width / 2,
				center = leftPos + widthHalf,
				pl = $(this).find('a, p').css('padding-left');

			bar.css({
				'bottom': '0px',
				'left' : 'calc(' + center + 'px - ' + pl + ')'
			}).addClass('active');
		},
		mouseleave : function(){
			bar.css({
				'bottom': '-4px'
			});
		}
	});

	var logos = $('#companyLogos'),
		navItems = $('#footerNavItems'),
		legal = $('#footerLegal'),
		copyright = $('.copyright');

	$('.navigationSocial').prependTo('.navigationMenuItems');
	$('#pricesButton').prependTo('.navigationSocial');
	$('#footerLogos > div').prepend(copyright);
	$('#footerLogos > div').prepend(legal);
	$('#footerLogos > div').prepend(navItems);
	$('#footerLogos > div').prepend(logos);

}
// MOBILE NAVIGATION
function navMobile(){
	// GIVE RIGHT POSITION TO NAVIGATION
	var width = $('.navigationMenuItems').width(),
		top = $('nav').height(),
		navOverlay = $('.navOverlay'),
		dropdown = $('.dropdown'),
		mobileAction = '.mobileAction',
		nav = 'nav';

	$('.dib').each(function(){
		$(this).removeClass('active');
	})

	$('.navigationMenuItems, .subNavigation').css({
		'right' : '-' + width + 'px'
	});

	// APPEND FOOTER ITEMS TO NAVIGATION BRICK AND REORDER
	$('#footerLogos ul, #footerLogos p').appendTo('.navigationMenuItems');
	$('.navigationSocial').insertAfter('.navigation');
	$('#companyLogos').insertAfter('#footerLegal');
	$('#pricesButton').insertAfter('.navigationClose');

	$(mobileAction).on('click', function(){

		$('.navigationMenuItems').toggleClass('active').css({
			'padding-top' : 'calc(' + top + 'px + 2rem)'
		});
		navOverlay.add(mobileAction).add(nav).toggleClass('active');
	});

	// SUBNAVIGATION
		//ADD LEVEL OF OVERLAY TO COVER PREVIOUS NAV
	dropdown.on('click', function(){
		$(this).parent().addClass('active');
		navOverlay.insertBefore($(this).parents().eq(1));
	});
	// CLOSE MOBILE NAVIGATION
	$('.navigationClose').on('click', function(){
		dropdown.parent().removeClass('active');
		navOverlay.add('.navigationMenuItems').add(nav).add(mobileAction).removeClass('active');
	});
	// MOVE "BACK IN" NAVIGATION
	$('.navigationBack').on('click', function(){
		$(this).parents().eq(1).removeClass('active');
		navOverlay.insertBefore($(this).parents().eq(3));
	});
	// ADD CSS TO GIVE SAME TOP POSITION AS PREVIOUS NAV
	$('.subNavigation').css({
		'width' : width + 'px',
		'padding-top' : 'calc(' + top + 'px + 2rem)'
	});
}
// END NAVIGATION
// START HOMEPAGE TEXT ANIMATION
function homepageTextAnimate(){
	var text = ['Everyday Products', 'Computers', 'GreenHouses', 'TV Screens', 'Legos®', 'read', 'aloud', 'please', 'Everyday Products', 'Everyday Products'],
		counter	= 0,
		elem = $('.homepageTextRotate'),
		width = elem.width();

		elem.css({
			'min-width' : width + 'px'
		})

		setInterval(change, 850);
		function change(){
			elem.text(text[counter]);
			counter++;
			if(counter >= text.length) {
				counter = 0;
			}
		}

} homepageTextAnimate();
// END HOMEPAGE TEXT ANIMIATION
// START BREADCRUMBS IN FOOTER
function breadcrumbs(){
	var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname,
		pathArray = window.location.pathname.split( '/' ),
		homepage = pathArray.length,
		breadcrumbs = $('#breadcrumbs ul');

		// console.log(homepage);

		if(homepage >= 5) {
			$(pathArray).each(function(){
				$('#breadcrumbs ul').append('<li class="fl"><a href="' + this + '">' + this + '</a></li>')
			});

			breadcrumbs.addClass('clearfix')
			breadcrumbs.find('li:first-of-type').remove();
			breadcrumbs.find('li:first-of-type').addClass('goHome').find('a').text('');
			breadcrumbs.find('li:nth-child(2)').remove();
		} else {
			$('#breadcrumbs').remove();
		}

} breadcrumbs();
// END BREADCRUMBS IN FOOTER
// add interior hero text to its own div on mobile
function moveInteriorHero(){
	$('.interiorHero p:not(.heroSubText)').insertAfter('.interiorHero').wrapAll('<section class="interiorHeroText backgroundTriangleTexture"><div class="centerTextPadding"></div></section>');
}
// RUN FUNCTIONS BASED UPON WIDTH OF WINDOW
// START PRODUCT HEIGHT FUNCTION
function productHeight(){
	$('.product').each(function(){
		var item = $(this).find('> div:first-of-type'),
			height = item.height(),
			pt = item.css('padding-top'),
			pb = item.css('padding-bottom'),
			finalHeight = height + pt + pb;
		$(this).css({
			'height' : 'calc(' + height + 'px + ' + pt + ' + ' + pb + ' + 3px)'
		})
	});
}
// END OF PRODUCT HEIGHT FUNCTION
// BROKEN OUT MORE TO ALLOW MOBILE FUNCTIONS
function documentFunctions(){
	if($(window).width() >= 1025) {
		navDesktop();
	} else if(1024 > $(window).width() > 768){
		navMobile();
	} else  {
		navMobile();
		moveInteriorHero()
	}
	// ANYTHING ABOVE AND BELOW 768
	if($(window).width() >= 769) {
		productHeight();
		equalheight('.twoThirdsColumn > div, .twoColumnSplit > div, .threeColumnModuleRise .textColumn');
		newsStory();
	} else {
		equalheight('.threeColumnModuleRise .textColumn');		
	}
}
$(window).on('load', function(){
	documentFunctions();
})
$(window).resize(function(){
	documentFunctions();
})
//end file
});