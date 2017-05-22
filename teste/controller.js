angular.module('mainModule.controller', [])

.controller('mainCtrl', function($scope, angularjsIssue){ 
    $scope.myData= [];
    
    $scope.getIssuesList = function () {
        $scope.myData = $scope.myData = angularjsIssue.getIssueList();
    };
    
    $scope.setCurrentIssue = function (number) {
        angularjsIssue.getIssue({
            number: number
        }, function (data) {
            $scope.myData = data;
        });
    };
    
    $scope.getIssuesList();
});