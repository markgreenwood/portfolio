var portfolioView = {};

portfolioView.handleMainNav = function() {
  /*
  */
  $('.main-nav').on('click', '.tab', function() {
    var selection = $(this).attr('data-content');
    console.log(selection);
    $('.tab-content').hide();
    $('#' + selection).fadeIn('slow');
  });

  $('.main-nav .tab:first').click();
};

portfolioView.handleMainNav();
