(function ($, once) {

  Drupal.behaviors.customCarousel = {
    selected: [],
    attach(context) {

      $(document).ready(function() {

        $(".center").slick({
          dots: true,
          infinite: true,
          centerMode: true,
          slidesToShow: 5,
          slidesToScroll: 3
        });

      });

    }
  };

})(jQuery, once);
