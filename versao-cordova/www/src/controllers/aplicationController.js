angular.module('appNutri.controllers')
	.controller('aplicationController', aplicationController);

	aplicationController.$inject = ['$rootScope', '$http', 'manageMessages']

	function aplicationController($rootScope, $http, manageMessages) {
		const vm = this;
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		const url = "mock/usuario.json";

		vm.user = [];

		vm.getUserInformations = getUserInformations;
		function getUserInformations(){
			const email = { email: $rootScope.email };
			const req = {
				url: url,
				method: 'GET',
				headers: headers,
				params: email		
			};

			$http(req).then(function(res){
				console.log("getUserInformations", res);
				vm.user = res.data;
				$rootScope.nutricionista = res.data.nutricionista;
			}), function(res){
				manageMessages.requisitionGetError(res);
			}
		}

		vm.resetValues = resetValues;
		function resetValues(){
			$rootScope.show.home = true;
			$rootScope.show.new = false;
			$rootScope.show.edit = false;
			$rootScope.show.delete = false;
		}

		vm.getUserInformations();

	   	console.log("vm", vm);
	};