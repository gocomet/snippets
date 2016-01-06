jQuery(function($){
  'use strict';
  
  $('.product-form .submit').on('click', function(){
    var elem = $(this);
    var quantity = parseInt(jQuery('[name="quantity"]').val(), 10) || 1;

    $("html, body").animate({ scrollTop: 0 }, 250, 'swing');

    (function animate() {
      var docW = document.documentElement.clientWidth;
      var $target = docW >= 720 ? $('#cart-target'): $('#cart-target-mobile');
      var $anim   = $('#cart-animation');

      console.log(docW);

      $anim.show();

      var addtocartWidth = elem.outerWidth() / 2;
      var addtocartHeight = elem.outerHeight() / 2;

      var addtocartLeft = elem.offset().left + addtocartWidth;
      var addtocartTop = $(elem).offset().top + addtocartHeight;

      var buttonAreaWidth = $target.outerWidth();
      var buttonAreaHeight = $target.outerHeight();

      var buttonAreaLeft = ($target.offset().left + buttonAreaWidth / 2  - $anim.outerWidth() / 2) - 4 - 18;
      var buttonAreaTop = ($target.offset().top + buttonAreaHeight / 2  - $anim.outerHeight() / 2) - 4 - 8;

      var path = {
        start: {
          x: addtocartLeft,
          y: addtocartTop,
          angle: 190.012,
          length: 0.2
        },
        end: {
          x: buttonAreaLeft,
          y: buttonAreaTop,
          angle: 90.012,
          length: 0.50
        }
      };

      $anim.text(quantity).animate({path : new $.path.bezier(path)},1200,function(){
        $anim.fadeOut(500);
      });
    })();
  });
});