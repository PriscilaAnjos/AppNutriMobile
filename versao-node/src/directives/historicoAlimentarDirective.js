angular.module('appNutri.directives')
	.directive('historicoAlimentar', historicoAlimentar);

	function historicoAlimentar() {
		return {
			restrict: 'E',
			templateUrl: 'static/views/historicoAlimentar.view.html',
			controller: 'historicoAlimentar',
			controllerAs: 'Historico'
		}
	}