/**
 *
 * jquery.delayedhover.js
 *
 * handy-dandy plugin for having your submenus stay open!
 * You probably wanna use this on the main menu if it has subs
 *
 * requires jQuery
 *
 * solution taken from
 * http://stackoverflow.com/questions/10792903/how-to-add-a-delay-to-css-vertical-dropdown-menu
 */
;(function($, undefined) {
	'use strict';

	$.fn.delayedHover = function(inCallback, outCallback, delay) {
		this.each(function(i, el) {
			var timer,
			$el = $(el);

			$el.on('mouseenter', function() {
				if (timer) {
					clearTimeout(timer);
					timer = null;
				} else {
					timer = setTimeout(function() {
						timer = null;
						inCallback.call(el);
					}, delay);
				}
			}).on('mouseleave', function() {
				if (timer) {
					clearTimeout(timer);
					timer = null;
				} else {
					timer = setTimeout(function() {
						timer = null;
						outCallback.call(el);
					}, delay);
				}
			});
		});
	};
})(jQuery);