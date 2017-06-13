angular.module('appNutri.routers', ['ngRoute'])
	.config(config);	

	config.$inject = ['$routeProvider', '$qProvider'];	

	function config($routeProvider, $qProvider){
        
		$routeProvider
			.when('/', {
				templateUrl: 'src/views/login.html',
				controller: 'loginController',
				controllerAs: 'Login'
			})
			.when('/index', {
				templateUrl: 'src/views/index.html',
				controller: 'applicationController',
				controllerAs: 'Application'
			})
	    .otherwise ({ redirectTo: '/' });

	}
