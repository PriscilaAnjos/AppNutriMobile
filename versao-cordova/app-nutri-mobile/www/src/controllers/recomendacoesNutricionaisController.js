angular.module('appNutri.controllers')
	.controller('recomendacoesNutricionais', recomendacoesNutricionais);

	recomendacoesNutricionais.$inject = ['$http', '$rootScope','manageMessages'];

	function recomendacoesNutricionais($http, $rootScope, manageMessages) {
		const vm = this;
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		const url = 'mock/recomendacoes.json';
		
		vm.title = "Recomendações nutricionais";
		vm.recomendacoes = [];

		vm.getRecomendacao = getRecomendacao();
		function getRecomendacao() {
			vm.recomendacoes = [];
			const email = { email: $rootScope.email };
			const req = {
				url: url,
				method: 'GET',
				headers: headers,
				params: email
			}

			$http(req).then(function(res) {
				vm.recomendacoes = res.data;
			}, function(res) {
				manageMessages.requisitionGetError(res);
			})
		}

		console.log("vm", vm);
	}