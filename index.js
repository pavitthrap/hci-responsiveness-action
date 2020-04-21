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
            return handleIssues(issuesJson, userIssues);
        }).catch(function(err) {
            console.log(err);
        });
    
    var date = new Date("April 10 2020 9:00");

}

function handleIssues(issuesJson, userIssues) {
    var issue;
    var issueID;
    for (i in issuesJson) {
        issue = issuesJson[i];
        issueID = issue.id;
        if(issueID < 30) {
            console.log('issueID: ' + issueID);
            console.log('issue State: ' + issue.state);
            userIssues.listIssueComments(issueID)
                .then(function({data: commentsJson}) {
                    console.log('Num comments: ' + commentsJson.length);
                }).catch(function(err) {
                    console.log(err);
                });
        }
    }
}
run();