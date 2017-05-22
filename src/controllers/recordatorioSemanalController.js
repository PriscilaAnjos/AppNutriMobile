angular.module('appNutri.controllers')
	.controller('recordatorioSemanal', recordatorioSemanal);

	recordatorioSemanal.$inject = ['$http', '$rootScope','manageMessages', '$filter', '$localStorage', '$controller'];

	function recordatorioSemanal($http, $rootScope, manageMessages, $filter, $localStorage, $controller) {
		let vm = this;


		vm.applicationController = $controller('aplicationController', {});

		if(vm.applicationController.func()){
			console.log("recordatorio");
		}


		const url = {
			urlget: 'mock/recordatorios.json',
			urlpost: '',
			urlput: '',
			urldelete: ''
		};
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		vm.title = {
			home: "Recordatório Semanal",
			new: "Novo",
			edit: "Edição"			
		};
		vm.show = {
			home: true,
			new: false,
			edit: false
		};
		vm.recordatorios = [];

		const date = new Date();
		const atual_user = $rootScope.email; 
		const atual_nutricionista = $rootScope.nutricionista;

		vm.getRecordatorio = getRecordatorio();
		function getRecordatorio() {
			vm.recordatorios = [];
			const req = {
				url: url.urlget,
				method: 'GET',
				params: atual_user
			}

			$http(req).then(function(res) {
				vm.recordatorios = res.data;
			}, function(res) {
				manageMessages.requisitionGetError(res);
			})
		}

		vm.newRecordatorio = newRecordatorio;
		function newRecordatorio(recordatorio) {
			const data = {
				id: 11,
				email: atual_user,
				data: recordatorio.data,
				dia_da_semana: $filter('dayOfWeek')(recordatorio.data),
				alimento: recordatorio.alimento,
				quantidade: recordatorio.quantidade,
				nutricionista: atual_nutricionista
			}

			const req = {
				method: 'POST',
	 			url: url.urlpost,
	 			headers: headers,
	 			data: data
			}

			$http(req).then(function(res){
				vm.changeVisibilityNew();
				vm.getRecordatorio();
			}, function(res){
				manageMessages.requisitionPostError(res);
			});
		}

		vm.editRecordatorio = editRecordatorio;
		function editRecordatorio(recordatorio) {
			const data = {
				recordatorio: recordatorio,
				user: atual_user
			}

			const req = {
				method: 'PUT',
	 			url: url.urlput,
	 			headers: headers,
	 			data: data
			}

			$http(req).then(function(res){
				vm.changeVisibilityEdit();
				vm.getRecordatorio();
			}, function(res){
				manageMessages.requisitionPostError(res);
			});
		}

		vm.deleteRecordatorio = deleteRecordatorio;
		function deleteRecordatorio(recordatorioId) {
			const data = {
				recordatorioId: recordatorioId,
				user: atual_user
			}
			const req = {
			    method: 'DELETE',
			    url: url.urldelete,
			    headers: headers,
			    data: data
			};

			$http(req).then(function(res) {
			    console.log(res.data);
			    vm.getRecordatorio();
			}, function(res) {
			    console.log(res.data);
			});
		}

		vm.changeVisibilityNew = changeVisibilityNew;
		function changeVisibilityNew(){
			vm.show.new = !(vm.show.new);
			vm.show.home = !(vm.show.home);
		}

		vm.changeVisibilityEdit = changeVisibilityEdit;
		function changeVisibilityEdit(recordatorio){		
			vm.show.edit = !(vm.show.edit);
			vm.show.home = !(vm.show.home);
			if(vm.show.edit)
				fillFields(recordatorio);
		}

		function fillFields(recordatorio){
			vm.formEdit = {
				alimento: recordatorio.alimento,
				quantidade: recordatorio.quantidade,
				id: recordatorio.id,
				data: new Date(recordatorio.data.substring(3, 5).toString() + 
						"/" + recordatorio.data.substring(0, 2).toString() +
						 "/" + recordatorio.data.substring(6, 10).toString())
			}
		}

		console.log("vm", vm);
	}