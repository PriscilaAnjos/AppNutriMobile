angular.module('appNutri.providers')
	.factory("accessFactory", accessFactory);

	accessFactory.$inject = ['$rootScope', '$location'];

	function accessFactory($rootScope, $location) {

		var access = false;

		function checkAccess(user) {
			console.log("checkAccess", user);
			if(user.perfilUsuario){
				$rootScope.user = user;
				$location.path('/index');
				access = true;
			}else{
				$location.path('/');
				console.log(user);
			}
		}

		function checkIndentification() {
			return this.access;
		}

		return {
			checkAccess: checkAccess,
			checkIndentification: checkIndentification
		}
	};