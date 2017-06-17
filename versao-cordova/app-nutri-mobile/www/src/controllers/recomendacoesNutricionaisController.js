angular.module('appNutri.controllers')
	.controller('recomendacoesNutricionais', recomendacoesNutricionais);

	recomendacoesNutricionais.$inject = ['$http', '$rootScope','manageMessages'];

	function recomendacoesNutricionais($http, $rootScope, manageMessages) {
		const vm = this;
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		const url = 'http://service.appnutri.ntr.br/Geral.service.php';
		const op = 'orientacaoNutricional';
		const user = $rootScope.user;
		vm.title = "Recomendações nutricionais";
		vm.recomendacoes = [];

		vm.getRecomendacao = getRecomendacao();
		function getRecomendacao() {			
			const params = {
				op: "orientacaoNutricional",
				dados: {
					"nutricionista": "1",
					"paciente": user.idPaciente
				}
			}
			const req = {
				url: url,
				method: 'GET',
				headers: headers,
				params: params
			}

			$http(req).then(function(res) {
				console.log("res", res);
				vm.recomendacoes = res.data;
			}, function(res) {
				manageMessages.requisitionGetError(res);
			})
		}

		console.log("vm", vm);
	}