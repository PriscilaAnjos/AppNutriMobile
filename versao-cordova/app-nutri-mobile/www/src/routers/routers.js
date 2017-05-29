angular.module('appNutri.routers', ['ngRoute'])
	.config(config);	

	config.$inject = ['$routeProvider', '$locationProvider', '$qProvider'];	

	function config($routeProvider, $locationProvider, $qProvider){
        $qProvider.errorOnUnhandledRejections(false);

		$routeProvider
			.when('/', {
				templateUrl: 'src/views/login.html',
				controller: 'loginController',
				controllerAs: 'Login'
			})
			.when('/index', {
				templateUrl: 'src/views/index.html',
				controller: 'aplicationController',
				controllerAs: 'appCtrl'
			})
	    .otherwise ({ redirectTo: '/' });

	}
