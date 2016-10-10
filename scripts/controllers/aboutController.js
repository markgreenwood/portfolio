// This application draws heavily on the techniques used in the Blog
// application (lab) in Code Fellows 301

(function(module) {
  aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('#about').fadeIn('slow');
  };

  module.aboutController = aboutController;
})(window);
