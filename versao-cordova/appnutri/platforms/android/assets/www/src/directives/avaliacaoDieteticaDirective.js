angular.module('appNutri.directives')
	.directive('avaliacaoDietetica', avaliacaoDietetica);

	function avaliacaoDietetica() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/avaliacaoDietetica.html',
			controller: 'avaliacaoDietetica',
			controllerAs: 'Avaliacao'
		}
	};