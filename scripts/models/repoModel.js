(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    $.ajax('https://api.github.com/users/markgreenwood/repos', { headers: { authorization: 'token ' + token }})
    .done(function(data) {
      data.forEach(function(obj) {
        reposObj.allRepos.push(obj);
      });
      callback();
    });
  };

  module.reposObj = reposObj;
})(window);
