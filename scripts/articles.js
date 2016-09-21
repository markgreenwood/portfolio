var articles = [];

function Article(opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function () {
  var $newArticle = $('article.template').clone();
  $newArticle.attr('data-category', this.category);

  /* TODO: Need to fill in rest of template clone with properties from this
  Article instance.
  Need:
    1. title
    2. publication date
    3. body
  */
  $newArticle.find('.article-title').text(this.title);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.find('.article-body').html(this.body);

  $newArticle.removeClass('template');

  return $newArticle;
};

ourLocalData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.publishedOn)) - (new Date(curElem.publishedOn));
});

ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
