angular.module('mainModule.provider', [])

.provider('angularjsIssue', function () {
    
    this.connection = '';
    
    this.$get = function($resource) {
    this.resource = $resource(this.connection);    
        // issue List
        this.resource.getIssueList = function () {
                return this.query()
            };
        
        // issue by ID
        this.resource.getIssue = function (number) {
                return this.get({ number: number})
            };
        return this.resource;        
    };
                 
    this.setConnection = function(connection){
                 this.connection = connection;
     };
    
  })