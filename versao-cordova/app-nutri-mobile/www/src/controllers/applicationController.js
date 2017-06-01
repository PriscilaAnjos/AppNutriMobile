angular.module('appNutri.controllers')
	.controller('applicationController', applicationController);

	applicationController.$inject = ['$rootScope', '$http', 'manageMessages']

	function applicationController($rootScope, $http, manageMessages) {
		const vm = this;

		vm.user = $rootScope.user;

		vm.resetValues = resetValues;
		function resetValues(){
			$rootScope.show.home = true;
			$rootScope.show.new = false;
			$rootScope.show.edit = false;
			$rootScope.show.delete = false;
		}

	   	console.log("vm", vm);
	};