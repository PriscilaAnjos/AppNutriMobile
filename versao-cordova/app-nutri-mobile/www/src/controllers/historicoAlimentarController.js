angular.module('appNutri.controllers')
	.controller('historicoAlimentar', historicoAlimentar);

	historicoAlimentar.$inject = ['$http', '$rootScope','manageMessages', '$filter', '$localStorage'];

	function historicoAlimentar($http, $rootScope, manageMessages, $filter, $localStorage) {
		const vm = this;
		const requests = {
			get: { url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "consumoSemana" },
			post: { url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "" },
			put: { url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "" },
			delete: { url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "" }
		};
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		const email = $rootScope.user.emailUsuario;

		$rootScope.show = {
			home: true,
			new: false,
			edit: false,
			delete: false
		};

		vm.title = {
			home: "Histórico Alimentar",
			new: "Novo",
			edit: "Edição",
			delete: "Tem certeza que deseja deletar esse histórico?"			
		};
		vm.refeicao = "Ainda não vem do banco";
		vm.id = 1;
		vm.historicos = [];

		vm.getHistorico = getHistorico();
		function getHistorico() {
			const params = {
				op: requests.get.op,
				dados: { "email": email }
			}
			const req = {
				url: requests.get.url,
				method: 'GET',
				headers: headers,
				params: params
			}

			$http(req).then(function(res) {
				vm.historicos = res.data;
			}, function(res) {
				manageMessages.requisitionGetError(res);
			})
		}

		vm.newHistorico = newHistorico;
		function newHistorico(historico) {
			const data = {
				op: requests.post.op,
				dados: {
					"id": 11,
					"emailUsuario": email,
					"dataIngestaoPaciente": $filter('date')(historico.data, 'yyyy-MM-dd'),
					"nomeAlimento": historico.alimento,
					"quantidadeIngestaoPaciente": historico.quantidade
				}
			}
			const req = {
	 			url: requests.post.op,
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
				op: requests.put.op,
				dados: {
					"id": 11,
					"emailUsuario": email,
					"dataIngestaoPaciente": $filter('date')(historico.data, 'yyyy-MM-dd'),
					"nomeAlimento": historico.alimento,
					"quantidadeIngestaoPaciente": historico.quantidade
				}
			}
			const req = {
	 			url: requests.put.url,
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
		function deleteHistorico(historico) {
			const data = {
				op: requests.delete.op,
				dados: { "id": historico }
			}
			const req = {
			    url: requests.delete.url,
			    method: 'DELETE',
			    headers: headers,
			    data: data
			};

			$http(req).then(function(res) {
			    vm.gethistorico();
			}, function(res) {
			    console.log(res.data);
			});
		}

		vm.changeVisibilityNew = changeVisibilityNew;
		function changeVisibilityNew(){
			$rootScope.show.new = !($rootScope.show.new);
			$rootScope.show.home = !($rootScope.show.home);
			if($rootScope.show.new)
				cleanFields();
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

		function cleanFields() {
			const fieldsNull = { id: '', alimento: '', quantidade: '', refeicao: '', data: '' }
            vm.formNew = angular.copy(fieldsNull);
			vm.newForm.$setPristine();
		}

		function fillFieldsEdit(historico){
			vm.formEdit = {
				id: vm.id,
				alimento: historico.nomeAlimento,
				quantidade: historico.quantidadeIngestaoPaciente,
				refeicao: vm.refeicao,
				data: new Date(historico.dataIngestaoPaciente)
			}
		}

		function fillFieldsDelete(historico){
			vm.delete = {
				id: vm.id,
				alimento: historico.nomeAlimento,
				quantidade: historico.quantidadeIngestaoPaciente,
				refeicao: vm.refeicao,
				data: new Date(historico.dataIngestaoPaciente)
			}
		}

		console.log("vm", vm);
	};