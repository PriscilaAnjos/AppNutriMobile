angular.module('appNutri.providers')
	.factory("accessFactory", accessFactory);

	accessFactory.$inject = ['$rootScope', '$location'];

	function accessFactory($rootScope, $location) {

		var access = false;

		function checkAccess(user) {
			console.log("checkAccess", user);
			if(user.access == "true"){
				$rootScope.access = user.access;
				$location.path('/index');
				access = true;
			}else{
				$location.path('/');
				alert("You don't have access");
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