// This application draws heavily on the techniques used in the Blog
// application (lab) in Code Fellows 301

(function(module) {
  portfolioController = {};

  portfolioController.reveal = function() {
    $('.tab-content').hide();
    $('#articles').fadeIn('slow');
  };

  module.portfolioController = portfolioController;
})(window);
