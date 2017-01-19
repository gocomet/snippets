/**
 * themeleon.mobileNewsletter
 *
 * Mobile Newsletter Popup
 * Modified for Shopify from Magento version
 * HTML/Liquid is found in theme/snippets/newsletter-popup-mobile.liquid
 * Receives events from theme/snippets/klaviyo-form.liquid
 *
 * @jess
 */

;(function(
    $,
    themeleon,
    undefined
) {

    "use strict";

    // Mobile Newsletter

    themeleon.initMobileNewsletter = function(){
        $('.newsletter-trigger').on('click', function(e) {
            e.preventDefault();
            $('#newsletter-mobile--container').toggleClass('show-form');
        });
    };

    // hides Mobile Newsletter CTA band

    themeleon.initMobileNewsletterHide = function(){
        $('.js-newsletter-close--cta').on('click', function(e) {
            e.preventDefault();
            $('.newsletter-mobile--cta').addClass('hide');
            $('#newsletter-mobile--container').removeClass('show-form');
        });
    };

    // closes Mobile Newsletter form

    themeleon.initMobileNewsletter001Hide = function(){
        $('.js-newsletter-close--popup').on('click', function(e) {
            e.preventDefault();
            $('#newsletter-mobile--container').removeClass('show-form');
        });
    };

    // sub/pub custom events on document
    var $doc = $(document);

    // hook into form success event
    // triggered in theme/snippets/klaviyo-form.liquid

    $doc.on("newsletter-popup-mobile--success", function(e, $form, message){
        $('#newsletter-mobile--container').removeClass('show-form');
        $('.newsletter-mobile--cta  .p-1').css('display', 'none');
        $('.newsletter-mobile--cta  .p-2').removeClass('hide-p');
        $('.newsletter-mobile--cta').delay(500).fadeOut(1600, "linear");
    });

    function init() {
        themeleon.initMobileNewsletter();
        themeleon.initMobileNewsletterHide();
        themeleon.initMobileNewsletter001Hide();
    }

    $(init);
}(jQuery, window.themeleon = window.themeleon || {}));