(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    $.ajax(
      '/github/users/markgreenwood/repos'
    ).done(function(data) {
      // TODO: can this be just reposObj.allRepos = data?
      data.forEach(function(obj) {
        reposObj.allRepos.push(obj);
      });
      callback();
    });
  };

  module.reposObj = reposObj;
})(window);
