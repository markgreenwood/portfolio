// This application draws heavily on the techniques used in the Blog
// application (lab) in Code Fellows 301

(function(module) {
  repoView = {};

  var repoCompiler = Handlebars.compile($('#repo-template').html());
  repoView.renderRepos = function () {
    $('#github-repos').empty().append(
      reposObj.allRepos.filter(function(repo) {
        return repo['fork'] === false;
      }).map(repoCompiler)
    );
  };

  reposObj.requestRepos(repoView.renderRepos);

  module.repoView = repoView;
})(window);
