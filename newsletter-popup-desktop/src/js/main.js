// try to run modularized code instead of booting everything up here
// don't want to make monolithic apps
// make modules and initialize when/where needed
// solely use themeleon as a namespace
(function(
	$,
	themeleon,
	undefined
) {
  'use strict';

  themeleon.init = function(options) {
  	themeleon.settings = options;
  	themeleon.desktopNewsletter = new themeleon.desktopNewsletter(themeleon.settings.desktopNewsletter);
  };
})(
	window.jQuery,
	window.themeleon = window.themeleon || {}
);
