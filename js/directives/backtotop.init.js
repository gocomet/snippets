/**
 * backtotop.init.js
 * send the user back to the top when they click the button
 *
 * requires jQuery
 */
jQuery(function($) {
	'use strict';

	var $win = $(window);
	var $scroller = $('html, body');
	var $backToTop = $('.js-back-to-top');

	$backToTop.on('click', function(e) {
		var scrollTop = $win.scrollTop();
		$scroller.animate({ scrollTop: 0 }, scrollTop / 3, 'easeOutQuart');
	});
});
