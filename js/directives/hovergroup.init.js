/**
 * hovergroup.init.js
 *
 * animate a bar to "float" under links in  a group
 * useful for main menus and tings
 *
 * as used on https://nudestix.ca
 *
 * requires jQuery
 *
 * TODO: make this more plug-and-play
 */
jQuery(function($) {
	'use strict';

	var HOVER_ATT = 'data-hover-group';
	var BAR_ATT = 'data-hover-group-bar';
	
	var Hovergroup = function(group) {
		var _this = this;

		this.initItem = function(el) {
			var $el = $(el);
			var isCurrent = $el.hasClass('current');
			var w = el.offsetWidth + 'px';
			var l = el.offsetLeft + 'px';

			if (isCurrent) {
				_this.defaultL = l;
				_this.defaultW = w;
				_this.$bar
					.addClass('is-current')
					.css({
						left: l,
						width: w
					});
			}

			$el.on('mouseenter', function(e) {
				_this.isHovering = true;

				_this.$bar.css({
					left: l,
					width: w
				});
			}).on('mouseleave', function(e) {
				_this.isHovering = false;

				setTimeout(function() {
					if (!_this.isHovering && _this.defaultL) {
						_this.$bar.css({
							left: _this.defaultL,
							width: _this.defaultW
						});
					}
				}, 100);
			});
		};

		this.init = function(group) {
			_this.group = group;
			_this.isHovering = false;
			_this.items = [];
			_this.$bar = $('[' + BAR_ATT + '="' + _this.group + '"]');
			
			$('[' + HOVER_ATT + '="' + _this.group + '"]').each(function() {
				_this.initItem(this);
			});
		};

		this.init(group);
	};

	$('[' + BAR_ATT + ']').each(function() {
		var group = this.getAttribute(BAR_ATT);
		var hovergroup = new Hovergroup(group);
	});
});
