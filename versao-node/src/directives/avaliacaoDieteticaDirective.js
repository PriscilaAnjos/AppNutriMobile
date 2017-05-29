angular.module('appNutri.directives')
	.directive('avaliacaoDietetica', avaliacaoDietetica);

	function avaliacaoDietetica() {
		return {
			restrict: 'E',
			templateUrl: 'static/views/avaliacaoDietetica.view.html',
			controller: 'avaliacaoDietetica',
			controllerAs: 'Avaliacao'
		}
	}