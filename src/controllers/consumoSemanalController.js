angular.module('appNutri.controllers')
	.controller('consumoSemanal', consumoSemanal);

	consumoSemanal.$inject = ['$http', '$rootScope', 'manageMessages', '$window', 'orderByFilter'];

	function consumoSemanal($http, $rootScope, manageMessages, $window, orderByFilter) {
		let vm = this;
		const url = 'mock/consumos.json';		
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
			const req = {
				url: url,
				method: 'GET',
				params: $rootScope.email
			}

			$http(req).then(function(res) {
				var cont_al = 0;
				var cont_qt = 0;
				const limit = 5;
				vm.consumos = res.data;
				angular.forEach(orderByFilter(vm.consumos, 'quantidade', true), function(value, key) {
					if(value.alimento && cont_al < limit){
						vm.alimentos.push(value.alimento);
						cont_al++;
					}
					if(value.quantidade && cont_qt < limit){
						vm.quantidades.push(value.quantidade);
						cont_qt++;
					}
				});
			}, function(res) {
				manageMessages.requisitionGetError(res);
			})
		}
	}