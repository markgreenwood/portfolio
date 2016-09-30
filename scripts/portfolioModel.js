(function(module) {

  // Article constructor function
  function Article(opts) {
    //DONE: use iteration to assign properties to this object.
    Object.keys(opts).forEach(function(key) {
      this[key] = opts[key];
    }, this); // last artgument tells the callback what to use as the value for *this*
  }

  Article.all = []; // initialize class variable 'all' to an empty list

  Article.prototype.toHtml = function () {
    // DONE: Render to HTML using Handlebars template
    /*
    1. Get the article Handlbars template using jQuery
    2. Compile the template using Handlebars
    3. Generate the HTML by calling te template function on this article's data-category
    */
    var source = $('#article-template').html();
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
    // Gets data from localStorage if it's there and etag matches etag value from responseHeader
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

    } else { // otherwise, read the data from the JSON file
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

  Article.numArticles = function() {
    return Article.all.length;
  };

  Article.avgWordCount = function() {
    var wcData = Article.all.map(function(article) {
      return article.body.match(/\w+/g).length;
    })
    .reduce(function(acc, curr, index) {
      return { sum: acc.sum + curr, count: index };
    }, { sum: 0, count: 0 });
    return wcData.sum/wcData.count;
  };

  Article.avgPostAge = function() {
    Article.all.map(function(article) {
      return article.daysAgo;
    });
    var ageData = Article.all.reduce(function(acc, curr, index) {
      return { sum: acc.sum + curr.daysAgo, count: index };
    }, { sum: 0, count: 0 });
    return (ageData.sum/ageData.count).toFixed(1);
  };

  module.Article = Article;

})(window);
