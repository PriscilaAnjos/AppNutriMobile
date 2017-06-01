angular.module('appNutri.controllers')
	.controller('consumoSemanal', consumoSemanal);

	consumoSemanal.$inject = ['$http', '$rootScope', 'manageMessages', '$window', 'orderByFilter'];

	function consumoSemanal($http, $rootScope, manageMessages, $window, orderByFilter) {
		const vm = this;
		const url = 'http://service.appnutri.ntr.br/Geral.service.php';	
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		const email = { email: $rootScope.user.emailUsuario };
	
		vm.title = "Consumo Semanal";
		vm.size_chart = {
			height: $window.innerHeight*0.7,
			width: $window.innerWidth*2
		};
		vm.consumos = [];
		vm.alimentos = [];
		vm.quantidades = [];

  		vm.getConsumo = getConsumo();
		function getConsumo() {
			const params = {
				op: "consumoSemana",
				dados: { "email": email }
			}

			const req = {
				url: url,
				method: 'GET',
				headers: headers,
				params: params
			}

			$http(req).then(function(res){
				console.log(res);
			}), function(res){
				manageMessages.requisitionGetError(res);
			}
		}
	};
