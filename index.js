var core = require('@actions/core');
var Github = require('github-api');

function run () {
    const userToken  = core.getInput('repo-token');
    var github = new Github({
        'token': userToken
    });
    var repoUser = github.getUser();
    console.log('success?');
}

run();