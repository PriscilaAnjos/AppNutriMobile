angular.module('appNutri.providers')
	.factory("accessFactory", accessFactory);

	accessFactory.$inject = ['$rootScope', '$location'];

	function accessFactory($rootScope, $location) {

		var success = false;

		function checkAccess(user) {
			if(user.success){
				$rootScope.access = user.success;
				$location.path('/index');
				success = true;
			}else{
				$location.path('/');
				alert("You don't have access");
			}
		}

		function checkIndentification() {
			return this.success;
		}

		return {
			checkAccess: checkAccess,
			checkIndentification: checkIndentification
		}
	}