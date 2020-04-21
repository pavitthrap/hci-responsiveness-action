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
    console.log('username: ' + user.__user);
    console.log('repo fullname: ' + userRepo.__fullname);

    // need to get username somehow
    var userIssues = github.getIssues('pavitthrap', repoName);
    userIssues.listIssues({state: 'open'})
        .then(function({data: issuesJson}) {
            console.log('Open Issues: ' + issuesJson.length);

        }).catch(function(err) {
            console.log(err);
        });
    userIssues.listIssues({state: 'closed'})
        .then(function({data: issuesJson}) {
            console.log('Closed Issues: ' + issuesJson.length);

        }).catch(function(err) {
            console.log(err);
        });
    userIssues.listIssues({state: 'all'})
        .then(function({data: issuesJson}) {
            console.log('All Issues: ' + issuesJson.length);

        }).catch(function(err) {
            console.log(err);
        });
    
    // var date = new Date("April 10 2020 9:00");

    // userIssues.listIssues({state: 'all'})
    //     .then(function({data: issuesJson}) {
    //         console.log('All Issues: ' + issuesJson.length);

    //     }).catch(function(err) {
    //         console.log(err);
    //     });
}
run();