angular.module('appNutri.directives')
	.directive('consumoSemanal', consumoSemanal);

	function consumoSemanal() {
		return {
			restrict: 'E',
			templateUrl: 'static/views/consumoSemanal.view.html',
			controller: 'consumoSemanal',
			controllerAs: 'Consumo'
		}
	}