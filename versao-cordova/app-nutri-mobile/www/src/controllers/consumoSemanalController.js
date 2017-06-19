angular.module('appNutri.controllers')
	.controller('consumoSemanal', consumoSemanal);

	consumoSemanal.$inject = ['$http', '$rootScope', 'manageMessages', '$window', 'orderByFilter'];

	function consumoSemanal($http, $rootScope, manageMessages, $window, orderByFilter) {
		const vm = this;
		const url = 'http://service.appnutri.ntr.br/Geral.service.php';	
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		const user = $rootScope.user;
	
		vm.title = "Consumo Semanal";
		vm.size_chart = {
			height: $window.innerHeight*0.7,
			width: $window.innerWidth*2
		};
		vm.consumos = [];
		vm.alimentos = [];
		vm.quantidades = [];
		vm.showConsumo = false;

  		$rootScope.getConsumo = getConsumo();
		function getConsumo() {
			
			const params = {
				op: "recordatorioGet",
				dados: { "email": user.emailUsuario }
			}
			const req = {
				url: url,
				method: 'GET',
				headers: headers,
				params: params
			}

			$http(req).then(function(res){
				console.log(res);
				const response = res.data;

				if(Object.keys(response).length !== 0){
					vm.showConsumo = true;
					var responseGroupBy = {};
					console.log("inside if on consumoSemanal")
					for (var i = 0; i < response.length; ++i) {
						var objResponse = response[i];
						if(responseGroupBy[objResponse.nomeAlimento] === undefined)
								responseGroupBy[objResponse.nomeAlimento] = [objResponse.nomeAlimento];
						responseGroupBy[objResponse.nomeAlimento].push(objResponse.quantidadeRecordatorioALimentar);
					};

					var chave;
					var valor = 0;

					angular.forEach(responseGroupBy, function(value, key) {
						for (var i = 0; i < value.length; i++) {
							if(value[i] == value[0]){
								chave = value[i];
								valor = 0;
							}else{
								valor += parseInt(value[i]);
							}
						}

						var consumo = {
							alimento: chave,
							quantidade: valor
						};
						vm.consumos.push(consumo);
					});

					var cont_al = 0;
					var cont_qt = 0;
					const limit = 5;
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
				}else{
					vm.showConsumo = false;
					console.log("The response is empty");
				}
			}), function(res){
				manageMessages.requisitionGetError(res);
			}
		}

		console.log("vm", vm);
	};
