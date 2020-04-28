var core = require('@actions/core');
var Github = require('github-api');
var globalDate = new Date("April 10 2020 9:00");

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
    console.log('repo fulname: ' + userRepo.__fullname);

    // need to get username somehow
    var userIssues = github.getIssues('pavitthrap', repoName);
    userIssues.listIssues({state: 'all'})
        .then(function({data: issuesJson}) {
            console.log('All Issues: ' + issuesJson.length);
            return handleIssues(issuesJson, userIssues);
        }).catch(function(err) {
            console.log(err);
        });
}

function getISODate(date) {
    var requestable = new Requestable();
    requestable._dateToISO(date)
        .then(function(formattedDate){
            return formattedDate;
        }).catch(function(err) {
            console.log(err);
        });
}
function handleIssues(issuesJson, userIssues) {
    var date = getISODate(globalDate);
    console.log('returned date is: ' + date);
    var issue;
    var issueID;
    console.log('in handleIssues function');
    for (i = 0; i < issuesJson.length; i++) {
        issue = issuesJson[i];
        issueID = issue.id;
        console.log(issueID);
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
run();