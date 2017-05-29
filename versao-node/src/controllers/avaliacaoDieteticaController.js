angular.module('appNutri.controllers')
	.controller('avaliacaoDietetica', avaliacaoDietetica);

	avaliacaoDietetica.$inject = ['$http', '$rootScope','manageMessages'];

	function avaliacaoDietetica($http, $rootScope, manageMessages) {
		let vm = this;
		vm.title = "Avaliação Dietética";
		vm.avaliacoes = [];

		vm.getAvaliacao = getAvaliacao();
		function getAvaliacao() {
			vm.avaliacoes = [];
			const url = 'mock/avaliacoes.json';
			const req = {
				url: url,
				method: 'GET',
				params: $rootScope.email
			}

			$http(req).then(function(res) {
				vm.avaliacoes = res.data;
			}, function(res) {
				manageMessages.requisitionGetError(res);
			})
		}

		console.log("vm", vm);
	}