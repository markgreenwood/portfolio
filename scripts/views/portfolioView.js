// This application draws heavily on the techniques used in the Blog
// application (lab) in Code Fellows 301

(function(module) {
  var portfolioView = {};

  portfolioView.renderIndexPage = function() {
    Article.all.forEach(function(article) {
      $('#articles').append(article.toHtml());
    });
    page('/');
    $('#num-articles').text(Article.numArticles());
    $('#avg-word-count').text(Article.avgWordCount());
    // TODO: report avg post age
    $('#avg-post-age').text(Article.avgPostAge());
  };

  Article.fetchAll(portfolioView.renderIndexPage);
})(window);
