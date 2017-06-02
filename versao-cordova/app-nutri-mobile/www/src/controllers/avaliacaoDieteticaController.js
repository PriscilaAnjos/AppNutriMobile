angular.module('appNutri.controllers')
	.controller('avaliacaoDietetica', avaliacaoDietetica);

	avaliacaoDietetica.$inject = ['$http', '$rootScope','manageMessages'];

	function avaliacaoDietetica($http, $rootScope, manageMessages) {
		const vm = this;
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		const url = 'mock/avaliacoes.json';
		
		vm.title = "Avaliação Dietética";
		vm.avaliacoes = [];

		vm.getAvaliacao = getAvaliacao();
		function getAvaliacao() {
			vm.avaliacoes = [];
			const email = { email: $rootScope.email };
			const req = {
				url: url,
				method: 'GET',
				headers: headers,
				params: email
			}

			$http(req).then(function(res) {
				vm.avaliacoes = res.data;
			}, function(res, status) {
				manageMessages.requisitionGetError(res, status);
			})
		}

		console.log("vm", vm);
	}