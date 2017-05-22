angular.module('appNutri.controllers')
	.controller('aplicationController', aplicationController);

	aplicationController.$inject = ['$rootScope', '$http', 'manageMessages']

	function aplicationController($rootScope, $http, manageMessages) {
		let vm = this;
		vm.user = [];
		const url = "";

		//vm.getUserInformations = getUserInformations();
		function getUserInformations(){
			const req = {
				url: url,
				method: 'GET',
				params: $rootScope.email		
			}

			$http(req).then(function(res){
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
		}

	   	console.log("vm", vm);
	}