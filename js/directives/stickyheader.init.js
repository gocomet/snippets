/**
 * stickyheader.init.js
 *
 * toggle an "is-sticky" class on a sticky header (and minicart)
 * when user scrolls
 *
 * requires jQuery, debounce function, requestAnimationFrame polyfill
 */
jQuery(function($) {
	'use strict';

	var THRESHOLD = 700;
	var STICKY_CLASS = 'is-sticky';
	
	var $win = $(window);
	var $header = $('.js-sticky-header');
	var $minicart = $('.js-minicart');
	var isSticky = false;

	$win.on('scroll', window.debounce(function(e) {
		var scrollTop = $win.scrollTop();
		if (scrollTop >= THRESHOLD && !isSticky) {
			isSticky = true;
			window.requestAnimationFrame(function() {
				$header.addClass(STICKY_CLASS);
				$minicart.addClass(STICKY_CLASS);
			});
		} else if (scrollTop < THRESHOLD && isSticky) {
			isSticky = false;
			window.requestAnimationFrame(function() {
				$header.removeClass(STICKY_CLASS);
				$minicart.removeClass(STICKY_CLASS);
			});
		}
	}, 100));
});
