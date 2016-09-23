var articles = [];

function Article(opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function () {
  // DONE: Render to HTML using Handlebars template
  /*
    1. Get the article Handlbars template using jQuery
    2. Compile the template using Handlebars
    3. Generate the HTML by calling te template function on this article's data-category
  */
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'posted ' + this.daysAgo + ' days ago' : '(unpublished)';
  var html = template(this);
  return html;
};

ourLocalPostData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.publishedOn)) - (new Date(curElem.publishedOn));
});

ourLocalPostData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
