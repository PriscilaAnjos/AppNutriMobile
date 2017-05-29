angular.module('appNutri.directives')
	.directive('consumoSemanal', consumoSemanal);

	function consumoSemanal() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/consumoSemanal.html',
			controller: 'consumoSemanal',
			controllerAs: 'Consumo'
		}
	};