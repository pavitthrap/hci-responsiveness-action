var core = require('@actions/core');
var Github = require('github-api');

function run () {
    const userToken  = core.getInput('repo-token');
    var github = new Github({
        'token': userToken
    });
    var user = github.getUser();
    var userRepos = user.listRepos(function(err, repos){
        console.log('Number of repos: ' + userRepos.length);
        userRepos.forEach(function(repo) {
            console.log(repo);
        })
    });
}
run();