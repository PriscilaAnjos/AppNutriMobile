angular.module('appNutri.directives')
	.directive('recordatorioSemanal', recordatorioSemanal);

	function recordatorioSemanal() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/recordatorioSemanal.html',
			controller: 'recordatorioSemanal',
			controllerAs: 'Recordatorio'
		}
	};