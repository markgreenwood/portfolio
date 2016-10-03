(function(module) {
  portfolioController = {};

  portfolioController.reveal = function() {
    $('.tab-content').hide();
    $('#articles').fadeIn('slow');
  };

  module.portfolioController = portfolioController;
})(window);
