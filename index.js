var core = require('@actions/core');
var Github = require('github-api');
var globalDate = new Date("07 April 2020 14:48 UTC");

function run () {
    const userToken  = core.getInput('repo-token');
    const repoName = core.getInput('repo-name');
    var github = new Github({
        'token': userToken
    });
    var user = github.getUser();
    var userRepo = github.getRepo(user, repoName);

    // need to get username somehow
    var userIssues = github.getIssues('pavitthrap', repoName);

    // need to calculate date as well
    var formattedISODate = getISODate(globalDate);
    console.log('date: ' + formattedISODate);

    var issueOptions = {
        state: 'all',
        since: formattedISODate
    }

    userIssues.listIssues(issueOptions)
        .then(function({data: issuesJson}) {
            console.log('All Issues: ' + issuesJson.length);
            return handleIssues(issuesJson, userIssues);
        }).catch(function(err) {
            console.log(err);
        });
}

function getISODate(date) {
    return date.toISOString();
}

function handleIssues(issuesJson, userIssues) {
    var issue;
    var issueID;
    var creationDate;
    console.log('in handleIssues function');
    for (i = 0; i < issuesJson.length; i++) {
        issue = issuesJson[i];
        issueID = issue.id;
        creationDate = issue.created_at;
        if(i < 5) {
            console.log('issueID: ' + issueID);
            console.log('creationDate: ' + creationDate);
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