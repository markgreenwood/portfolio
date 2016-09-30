(function(module) {
  var portfolioView = {};

  portfolioView.handleMainNav = function() {
    /*
    */
    $('.main-nav').on('click', '.tab', function() {
      var selection = $(this).attr('data-content');
      //console.log(selection);
      $('.tab-content').hide();
      $('#' + selection).fadeIn('slow');
    });

    $('.main-nav .tab:first').click();
  };

  portfolioView.renderIndexPage = function() {
    Article.all.forEach(function(article) {
      $('#articles').append(article.toHtml());
    });
    portfolioView.handleMainNav();
    $('#num-articles').text(Article.numArticles());
    $('#avg-word-count').text(Article.avgWordCount());
    // TODO: report avg post age
    $('#avg-post-age').text(Article.avgPostAge());
  };

  Article.fetchAll(portfolioView.renderIndexPage);
})(window);
