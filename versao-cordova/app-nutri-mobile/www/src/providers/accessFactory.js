angular.module('appNutri.providers')
	.factory("accessFactory", accessFactory);

	accessFactory.$inject = ['$rootScope', '$location'];

	function accessFactory($rootScope, $location) {

		function checkAccess(user) {
			console.log("checkAccess", user);
			if(user){
				if(user.perfilUsuario){
					$rootScope.user = user;
					$location.path('/index');
					return true;
				}else{
					return false;
				}
				return false;
			}
		}

		return {
			checkAccess: checkAccess
		}
	};