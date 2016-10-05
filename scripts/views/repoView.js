(function(module) {
  repoView = {};

  var repoCompiler = Handlebars.compile($('#repo-template').html());
  repoView.renderRepos = function () {
    $('#github-repos').empty().append(
      reposObj.allRepos.map(repoCompiler)
    );
  };

  reposObj.requestRepos(repoView.renderRepos);
  
  module.repoView = repoView;
})(window);
