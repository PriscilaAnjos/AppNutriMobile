angular.module('appNutri.routers', ['ngRoute'])
	.config(config);	

	config.$inject = ['$routeProvider', '$locationProvider'];	

	function config($routeProvider, $locationProvider){
	    
		$routeProvider
			.when('/', {
				templateUrl: 'static/views/login.view.html',
				controller: 'loginController',
				controllerAs: 'Login'
			})
			.when('/index', {
				templateUrl: 'static/views/index.view.html',
				controller: 'aplicationController',
				controllerAs: 'appCtrl',
				resolve: {
					"check": function(accessFactory) {
						if(accessFactory.checkIndentification()){

						}else{
							redirectTo: '/';
						}
					}
				}
			})
	    .otherwise ({ redirectTo: '/' });

   	    $locationProvider.html5Mode(true);
	}
