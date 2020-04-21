var core = require('@actions/core');
var Github = require('github-api');

function run () {
    const userToken  = core.getInput('repo-token');
    const repoName = core.getInput('repo-name');
    var github = new Github({
        'token': userToken
    });
    var user = github.getUser();
    var userRepo = github.getRepo(user, repoName);
    console.log('name of repo: ' + repoName);
    console.log('userRepo: ' + userRepo);
    console.log('type: ' + typeof(userRepo));
    var userIssues = github.getIssues(user, userRepo);
    userIssues.listIssues()
        .then(function({data: issuesJson}) {
            console.log('Num Issues: ' + issuesJson.length);
        });
}
run();