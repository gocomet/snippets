/**
 * themeleon.desktopNewsletter
 *
 * Destop Newsletter Popup
 *
 */


;(function($, themeleon, undefined) {
    'use strict';

    themeleon.desktopNewsletter = function(options) {
        // constants
        var YEAR = 365;
        var MILLISECONDS_IN_DAY = 86400000;

        // internal properties
        var pageviews;
        var self = this;
        var el = '#newsletter-popup-desktop';
        var cookies = {
            pageviews: {
                name: 'demacPageviews'
            },
            days: {
                name: 'demacDays'
            },
            subscriber: {
                name: 'demacSubscriber'
            }
        };
        
        // settings
        var settings;
        var defaults = {
            enabled: false,
            pageviews: 1,
            days: 1,
            seconds: 0
        };

        /**
         * open (public method)
         * opens popup
         * may be called externally, on say, click event handler
         */
        this.open = function() {
            $.magnificPopup.open({
                items: {
                  src: el
                },
                type: 'inline',
                mainClass: 'mfp-zoom-in',
                removalDelay: 300
            }, 0);

            if (event && event.preventDefault) {
                event.preventDefault();
            }
        };
 
        /**
         * set settings
         * overwrite defaults
         * with theme settings
         * passed in from /theme/layouts/theme.liquid
         */
        function setSettings() {
            settings = $.extend(true, {}, defaults, options);    
            settings.delay = parseInt(settings.seconds, 10);
        }

        /**
         * determine whether or not
         * enough days have passed
         * to display popup again
         */
        function checkDays() {
            var currentTimestamp = +new Date();
            var cookieTimestamp;
            var isCorrectDay;
            var daysSince;
            var diff;

            cookies.days.value = $.cookie(cookies.days.name);

            // if the "days" cookie has been set
            // check the cookie's timestamp against the current one
            // to determine how many days have passed
            if (cookies.days.value) {
                cookieTimestamp = parseInt(cookies.days.value, 10);
                diff = currentTimestamp - cookieTimestamp;
                
                // avoid doing division with big numbers
                for (daysSince = 0; diff > MILLISECONDS_IN_DAY; diff = diff - MILLISECONDS_IN_DAY) {
                    daysSince++;
                }

                isCorrectDay = daysSince >= settings.days;

            // if the "days" cookie is not set yet,
            // then we haven't shown the popup yet,
            // and don't need to worry about days
            } else {
                isCorrectDay = false;
            }

            // always update "days" cookie if it already exists
            // and also possibly create it if it doesn't exist yet
            cookies.days.value = currentTimestamp;

            return isCorrectDay;
        }

        /**
         * determine whether or not
         * enough pageviews have happened
         * for us to display popup
         */
        function checkPageviews() {
            var pageviews = 0;
            var isCorrectPageview;

            cookies.pageviews.value = $.cookie(cookies.pageviews.name);
            
            if (cookies.pageviews.value) {
                pageviews = parseInt(cookies.pageviews.value, 10);
            }

            pageviews++;

            cookies.pageviews.value = pageviews;
            isCorrectPageview = pageviews === settings.pageviews;

            return isCorrectPageview;
        }

        /**
         * set cookie
         * for when user returns
         * so popup doesn't show
         */
        function setCookie(name, val) {
            $.cookie(name, val, {
                path: '/',
                expires: YEAR
            });
        }

        /**
         * initialize
         * set settings
         * set/check cookies
         * determine whether to show or not based on cookies
         * if we should show, show
         */
        this.init = function() {
            var isCorrectPageview;
            var isSubscriber;
            var isCorrectDay;

            setSettings();

            if (!settings.enabled) {
                return false;
            }

            // if popup is enabled
            // check cookies for current data
            // determine if we will show or not
            isCorrectPageview = checkPageviews();
            isCorrectDay = checkDays();

            // if we're showing the popup
            // show popup by delay
            // adjust "days" cookie since we've shown the popup
            if (isCorrectPageview || isCorrectDay) {
                setTimeout(function(){
                  self.open();
                }, settings.delay);

                setCookie(cookies.days.name, cookies.days.value);
            }

            // update pageviews cookie whether or not popup is shown
            setCookie(cookies.pageviews.name, cookies.pageviews.value);
        };

        this.init();
    };
})(window.jQuery, window.themeleon = window.themeleon || {});
