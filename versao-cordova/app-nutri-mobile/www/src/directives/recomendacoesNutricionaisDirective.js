angular.module('appNutri.directives')
	.directive('recomendacoesNutricionais', recomendacoesNutricionais);

	function recomendacoesNutricionais() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/recomendacoesNutricionais.html',
			controller: 'recomendacoesNutricionais',
			controllerAs: 'Recomendacao'
		}
	};