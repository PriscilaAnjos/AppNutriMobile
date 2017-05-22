angular.module('mainModule.config', [])

.config(function(angularjsIssueProvider){
 angularjsIssueProvider.setConnection('https://api.github.com/repos/angular/angular.js/issues');
})
