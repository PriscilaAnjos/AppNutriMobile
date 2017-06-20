angular.module('appNutri.directives')
	.directive('historicoAlimentar', historicoAlimentar)
	.directive('historicoAlimentarGet', historicoAlimentarGet)
	.directive('historicoAlimentarNew', historicoAlimentarNew)
	.directive('historicoAlimentarEdit', historicoAlimentarEdit)
	.directive('historicoAlimentarDelete', historicoAlimentarDelete)
	.directive('historicoAlimentarGetAlimento', historicoAlimentarGetAlimento);

	function historicoAlimentar() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/historicoAlimentar.html',
			controller: 'historicoAlimentar',
			controllerAs: 'Historico'
		}
	};
	
	function historicoAlimentarGet() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/historicoAlimentarGet.html',
			controller: 'historicoAlimentar',
			controllerAs: 'Historico'
		}
	};

	function historicoAlimentarNew() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/historicoAlimentarNew.html',
			controller: 'historicoAlimentar',
			controllerAs: 'Historico'
		}
	};

	function historicoAlimentarEdit() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/historicoAlimentarEdit.html',
			controller: 'historicoAlimentar',
			controllerAs: 'Historico'
		}
	};

	function historicoAlimentarDelete() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/historicoAlimentarDelete.html',
			controller: 'historicoAlimentar',
			controllerAs: 'Historico'
		}
	};
	function historicoAlimentarGetAlimento() {
		return {
			restrict: 'E',
			templateUrl: 'src/views/historicoAlimentarGetAlimento.html',
			controller: 'historicoAlimentar',
			controllerAs: 'Historico'
		}
	};