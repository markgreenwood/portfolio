var portfolioView = {};

portfolioView.handleMainNav = function() {
  /*
  */
  $('.main-nav').on('click', 'li', function() {
    var selection = $(this).attr('data-content');
    console.log(selection);
    $('.tab-content').hide();
    $('.tab-content').filter('#' + selection).fadeIn('slow');
  });

  $('.main-nav .tab:first').click();
};

portfolioView.handleMainNav();
