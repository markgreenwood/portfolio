function Article(opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.all = []; // initialize class variable 'all' to an empty list

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

Article.loadAll = function(articlesData) {
  articlesData.sort(function(curArticle, nextArticle) {
    return (new Date(nextArticle.publishedOn)) - (new Date(curArticle.publishedOn));
  }).forEach(function(article) {
    Article.all.push(new Article(article));
  });
};

Article.fetchAll = function(nextFunction) {
  if (localStorage.articlesData) {
    // DONE: check JSON header's ETag against localStorage.ETag
    $.ajax({
      type: 'HEAD',
      url:  '/data/articles.json',
    })
    .done(function(data, status, xhr) {
      var eTag = xhr.getResponseHeader('eTag');
      if (!localStorage.eTag || eTag !== localStorage.eTag) {
        localStorage.setItem('eTag', eTag);
        // DONE: get articles from "server" (JSON file)
        Article.getAllFromFile(nextFunction);
      } else {
        //console.log('Loading articles from localStorage');
        Article.loadAll(JSON.parse(localStorage.articlesData));
        nextFunction();
      }
    });
  } else {
    // DONE: get articles data from "server" (JSON file)
    Article.getAllFromFile(nextFunction); // DONE: pass 'nextFunction' into getAll();
  }
};

Article.getAllFromFile = function(nextFunction) {
  //console.log('Reading articles data from JSON file...');
  $.getJSON('data/articles.json', function(respData) {
    Article.loadAll(respData);
    localStorage.articlesData = JSON.stringify(respData);
    nextFunction();
  });
};
