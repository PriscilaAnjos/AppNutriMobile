angular.module('appNutri.directives')
	.directive('recordatorioSemanal', recordatorioSemanal);

	function recordatorioSemanal() {
		return {
			restrict: 'E',
			templateUrl: 'static/views/recordatorioSemanal.view.html',
			controller: 'recordatorioSemanal',
			controllerAs: 'Recordatorio'
		}
	}