angular.module('appNutri.controllers')
	.controller('recordatorioSemanal', recordatorioSemanal);

	recordatorioSemanal.$inject = ['$http', '$rootScope','manageMessages', '$filter', '$localStorage'];

	function recordatorioSemanal($http, $rootScope, manageMessages, $filter, $localStorage) {
		const vm = this;

		$rootScope.show = {
			home: true,
			new: false,
			edit: false,
			delete: false
		};

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
			edit: "Edição",
			delete: "Tem certeza que deseja deletar esse recordatorio?"			
		};

		vm.recordatorios = [];

		const date = new Date();
		const email = { email: $rootScope.email };
		const atual_nutricionista = $rootScope.nutricionista;

		vm.getRecordatorio = getRecordatorio();
		function getRecordatorio() {
			const req = {
				url: url.urlget,
				method: 'GET',
				headers: headers,
				params: email
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
				data: new Date(recordatorio.data),
				alimento: recordatorio.alimento,
				quantidade: recordatorio.quantidade,
				nutricionista: atual_nutricionista
			}

			const req = {
	 			url: url.urlpost,
				method: 'POST',
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
	 			url: url.urlput,
				method: 'PUT',
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
			    url: url.urldelete,
			    method: 'DELETE',
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
			$rootScope.show.new = !($rootScope.show.new);
			$rootScope.show.home = !($rootScope.show.home);
		}

		vm.changeVisibilityEdit = changeVisibilityEdit;
		function changeVisibilityEdit(recordatorio){		
			$rootScope.show.edit = !($rootScope.show.edit);
			$rootScope.show.home = !($rootScope.show.home);
			if($rootScope.show.edit)
				fillFieldsEdit(recordatorio);
		}

		vm.changeVisibilityDelete = changeVisibilityDelete;
		function changeVisibilityDelete(recordatorio){		
			$rootScope.show.delete = !($rootScope.show.delete);
			$rootScope.show.home = !($rootScope.show.home);
			if($rootScope.show.delete)
				fillFieldsDelete(recordatorio);
		}

		function fillFieldsDelete(recordatorio){
			vm.delete = {
				alimento: recordatorio.alimento,
				quantidade: recordatorio.quantidade,
				id: recordatorio.id,
				data: new Date(recordatorio.data.substring(3, 5).toString() + 
						"/" + recordatorio.data.substring(0, 2).toString() +
						 "/" + recordatorio.data.substring(6, 10).toString())
			}
		}

		function fillFieldsEdit(recordatorio){
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
	};