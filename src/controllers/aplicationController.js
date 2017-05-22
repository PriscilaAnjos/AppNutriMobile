angular.module('appNutri.controllers')
	.controller('aplicationController', aplicationController);

	aplicationController.$inject = ['$rootScope', '$http', 'manageMessages', '$watch']

	function aplicationController($rootScope, $http, manageMessages, $watch) {
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

		vm.func = func;
		function func(){
			vm.$watch('li', function(values){
				console.log(values);
			});
		}

	   	console.log("vm", vm);
	}