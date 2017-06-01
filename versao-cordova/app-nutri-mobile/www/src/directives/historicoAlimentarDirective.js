angular.module('appNutri.directives')
	.directive('historicoAlimentar', historicoAlimentar);

	function historicoAlimentar() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/historicoAlimentar.html',
			controller: 'historicoAlimentar',
			controllerAs: 'Historico'
		}
	};