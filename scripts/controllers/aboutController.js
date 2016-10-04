(function(module) {
  aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('#about').fadeIn('slow');
  };

  module.aboutController = aboutController;
})(window);
