var articles = [];

function Article(opts) {

}

Article.prototype.toHtml = function () {

};

ourLocalData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.publishedOn)) - (new Date(curElem.publishedOn));
});
