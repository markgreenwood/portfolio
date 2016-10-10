// This application draws heavily on the techniques used in the Blog
// application (lab) in Code Fellows 301

(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    $.ajax({
      url: '/github/users/markgreenwood/repos?per_page=100'
    }).done(function(data) {
      // TODO: can this be just reposObj.allRepos = data?
      data.forEach(function(obj) {
        reposObj.allRepos.push(obj);
      });
      callback();
    });
  };

  module.reposObj = reposObj;
})(window);
