angular.module('appNutri.controllers')
	.controller('aplicationController', aplicationController);

	aplicationController.$inject = ['$rootScope', '$http', 'manageMessages']

	function aplicationController($rootScope, $http, manageMessages) {
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