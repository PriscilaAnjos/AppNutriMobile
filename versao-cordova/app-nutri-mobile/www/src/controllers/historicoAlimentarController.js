angular.module('appNutri.controllers')
	.controller('historicoAlimentar', historicoAlimentar);

	historicoAlimentar.$inject = ['$http', '$rootScope','manageMessages', '$filter', '$localStorage'];

	function historicoAlimentar($http, $rootScope, manageMessages, $filter, $localStorage) {
		const vm = this;

		$rootScope.show = {
			home: true,
			new: false,
			edit: false,
			delete: false
		};
		const url = {
			get: 'mock/historicos.json',
			post: '',
			put: '',
			delete: ''
		};
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		vm.title = {
			home: "Histórico Alimentar",
			new: "Novo",
			edit: "Edição",
			delete: "Tem certeza que deseja deletar esse histórico?"			
		};
		vm.historicos = [];

		const date = new Date();
		const email = { email: $rootScope.email };
		const nutricionista = {nutricionista: $rootScope.nutricionista };

		vm.getHistorico = getHistorico();
		function getHistorico() {
			const req = {
				url: url.get,
				method: 'GET',
				headers: headers,
				params: email
			}

			$http(req).then(function(res) {
				vm.historicos = res.data;
			}, function(res, status) {
				manageMessages.requisitionGetError(res, status);
			})
		}

		vm.newHistorico = newHistorico;
		function newHistorico(historico) {
			const data = {
				id: 11,
				email: email,
				data: new Date(historico.data),
				alimento: historico.alimento,
				quantidade: historico.quantidade,
				nutricionista: nutricionista
			}

			const req = {
	 			url: url.post,
				method: 'POST',
	 			headers: headers,
	 			data: data
			}

			$http(req).then(function(res){
				vm.changeVisibilityNew();
				vm.gethistorico();
			}, function(res){
				manageMessages.requisitionPostError(res);
			});
		}

		vm.editHistorico = editHistorico;
		function editHistorico(historico) {
			const data = {
				historico: historico,
				user: email
			}

			const req = {
	 			url: url.put,
				method: 'PUT',
	 			headers: headers,
	 			data: data
			}

			$http(req).then(function(res){
				vm.changeVisibilityEdit();
				vm.gethistorico();
			}, function(res){
				manageMessages.requisitionPostError(res);
			});
		}

		vm.deleteHistorico = deleteHistorico;
		function deleteHistorico(historicoId) {
			const data = {
				historicoId: historicoId,
				user: email
			}
			const req = {
			    url: url.delete,
			    method: 'DELETE',
			    headers: headers,
			    data: data
			};

			$http(req).then(function(res) {
			    console.log(res.data);
			    vm.gethistorico();
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
		function changeVisibilityEdit(historico){		
			$rootScope.show.edit = !($rootScope.show.edit);
			$rootScope.show.home = !($rootScope.show.home);
			if($rootScope.show.edit)
				fillFieldsEdit(historico);
		}

		vm.changeVisibilityDelete = changeVisibilityDelete;
		function changeVisibilityDelete(historico){		
			$rootScope.show.delete = !($rootScope.show.delete);
			$rootScope.show.home = !($rootScope.show.home);
			if($rootScope.show.delete)
				fillFieldsDelete(historico);
		}

		function fillFieldsDelete(historico){
			vm.delete = {
				alimento: historico.alimento,
				quantidade: historico.quantidade,
				id: historico.id,
				refeicao: historico.refeicao,
				data: new Date(historico.data.substring(3, 5).toString() + 
						"/" + historico.data.substring(0, 2).toString() +
						 "/" + historico.data.substring(6, 10).toString())
			}
		}

		function fillFieldsEdit(historico){
			vm.formEdit = {
				alimento: historico.alimento,
				quantidade: historico.quantidade,
				id: historico.id,
				refeicao: historico.refeicao,
				data: new Date(historico.data.substring(3, 5).toString() + 
						"/" + historico.data.substring(0, 2).toString() +
						 "/" + historico.data.substring(6, 10).toString())
			}
		}

		console.log("vm", vm);
	};