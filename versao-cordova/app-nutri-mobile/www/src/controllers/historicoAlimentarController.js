angular.module('appNutri.controllers')
	.controller('historicoAlimentar', historicoAlimentar);

	historicoAlimentar.$inject = ['$http', '$rootScope','manageMessages', '$filter', '$localStorage'];

	function historicoAlimentar($http, $rootScope, manageMessages, $filter, $localStorage) {
		const vm = this;
		const requests = {
			get: { url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "recordatorioGet" },
			post: { url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "recordatorioPost" },
			put: { url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "recordatorioPut" },
			delete: { url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "recordatorioDelete" },
			alimentoGet: {url: 'http://service.appnutri.ntr.br/Geral.service.php', op: "buscaAlimento"}
		};
		const headers = {'Content-type': 'application/json;charset=utf-8'};
		const user = $rootScope.user;

		$rootScope.show = {
			home: true,
			new: false,
			edit: false,
			delete: false,
			alimento: false
		};

		vm.title = {
			home: "Histórico Alimentar",
			new: "Novo",
			edit: "Edição",
			delete: "Tem certeza que deseja deletar esse histórico?",
			alimento: "Selecione um alimento"			
		};
		vm.refeicao = "Ainda não vem do banco";
		vm.id = 1;
		vm.historicos = [];
		vm.showHistorico = false;
		vm.alimentos = [];
		vm.alimento = {
			nome: null,
			id: null
		};
		vm.newForm = "";

		$rootScope.getHistorico = getHistorico();
		function getHistorico() {
			const params = {
				op: requests.get.op,
				dados: { "email": user.emailUsuario }
			}
			const req = {
				url: requests.get.url,
				method: 'GET',
				headers: headers,
				params: params
			}

			$http(req).then(function(res) {
				console.log(res);
				vm.historicos = res.data;
				if(Object.keys(vm.historicos).length !== 0)
					vm.showHistorico = true;
			}, function(res) {
				manageMessages.requisitionGetError(res);
			})
		}

		vm.newHistorico = newHistorico;
		function newHistorico(historico) {

			const data = {
					"idPaciente": user.idPaciente,
					"nomePaciente": user.nomeUsuario,
					"idAlimento": vm.alimento.id,
					"nomeAlimento": vm.alimento.nome,
					"dataRecordatorioAlimentar": $filter('date')(historico.data, 'yyyy-MM-dd'),
					"quantidadeRecordatorioALimentar": historico.quantidade
				}

			const url = requests.post.url + '?op='+requests.post.op+'&dados=[{"idPaciente":"'+data.idPaciente+'","nomePaciente":"'+data.nomePaciente+'","idAlimento":"'+data.idAlimento+'","nomeAlimento":"'+data.nomeAlimento+'","dataRecordatorioAlimentar":"'+data.dataRecordatorioAlimentar+'","quantidadeRecordatorioALimentar":"'+data.quantidadeRecordatorioALimentar+'"}]';
			
			console.log("data", data);

			const req = {
	 			url: url,
				method: 'POST',
	 			headers: headers
			}
			console.log("post req", req);

			$http(req).then(function(res){
				console.log("post res", res);
				cleanFields();
				getHistorico();
				changeVisibilityNew();
				console.log("response")
			}, function(res){
				manageMessages.requisitionPostError(res);
			});
		}

		vm.editHistorico = editHistorico;
		function editHistorico(historico) {
			const data = {
					"idPaciente": user.idPaciente,
					"nomePaciente": user.nomeUsuario,
					"idAlimento": vm.alimento.id,
					"nomeAlimento": vm.alimento.nome,
					"dataRecordatorioAlimentar": $filter('date')(historico.data, 'yyyy-MM-dd'),
					"quantidadeRecordatorioALimentar": historico.quantidade
				}

			const url = requests.put.url + '?op='+requests.put.op+'&dados=[{"idPaciente":"'+data.idPaciente+'","nomePaciente":"'+data.nomePaciente+'","idAlimento":"'+data.idAlimento+'","nomeAlimento":"'+data.nomeAlimento+'","dataRecordatorioAlimentar":"'+data.dataRecordatorioAlimentar+'","quantidadeRecordatorioALimentar":"'+data.quantidadeRecordatorioALimentar+'"}]';
			
			const req = {
	 			url: url,
				method: 'PUT',
	 			headers: headers
			}
			
			console.log("put req", req);
			
			$http(req).then(function(res){
				console.log("put res", res);
				vm.alimento = { nome: '', id: '' };
				getHistorico();
				changeVisibilityEdit();
			}, function(res){
				manageMessages.requisitionPostError(res);
			});
		}

		vm.deleteHistorico = deleteHistorico;
		function deleteHistorico(historico) {
			
			const data = {
				"idPaciente": user.idPaciente,
				"idAlimento": historico.id,
				"dataRecordatorioAlimentar": $filter('date')(historico.data, 'yyyy-MM-dd'),
			}

			const url = requests.delete.url + '?op='+requests.delete.op+'&dados=[{"idPaciente":"'+data.idPaciente+'","idAlimento":"'+data.idAlimento+'","dataRecordatorioAlimentar":"'+data.dataRecordatorioAlimentar+'"}]';

			const req = {
			    url: url,
			    method: 'DELETE',
			    headers: headers
			};

			console.log("delete req", req);

			$http(req).then(function(res) {
				console.log("delete res", res);
				changeVisibilityDelete();
			    getHistorico();
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
			if($rootScope.show.home){
				vm.alimento = null;
			}
		}

		vm.changeVisibilityDelete = changeVisibilityDelete;
		function changeVisibilityDelete(historico){		
			$rootScope.show.delete = !($rootScope.show.delete);
			$rootScope.show.home = !($rootScope.show.home);
			if($rootScope.show.delete)
				fillFieldsDelete(historico);
		}

		function cleanFields() {
			const fieldsNull = { id: '', quantidade: '', refeicao: '', data: '' }
			vm.alimento = { nome: '', id: '' }
            vm.formNew = angular.copy(fieldsNull);
			//vm.newForm.$setPristine();
		}

		function fillFieldsEdit(historico){
			vm.formEdit = {
				quantidade: historico.quantidadeRecordatorioALimentar,
				id: historico.idAlimento,
				data: new Date(historico.dataRecordatorioAlimentar.substring(0, 4).toString() + 
						 "/" + historico.dataRecordatorioAlimentar.substring(5, 7).toString() +
						"/" + historico.dataRecordatorioAlimentar.substring(8, 10).toString())
			}
			vm.alimento.nome = historico.nomeAlimento;
		}

		function fillFieldsDelete(historico){
			vm.delete = {
				alimento: historico.nomeAlimento,
				quantidade: historico.quantidadeRecordatorioALimentar,
				id: historico.idAlimento,
				data: historico.dataRecordatorioAlimentar
			}
		}

		vm.getAlimentos = getAlimentos;
		function getAlimentos() {
			const params = {
				op: requests.alimentoGet.op,
				dados: { "alimento": "ALL" }
			}
			const req = {
				url: requests.alimentoGet.url,
				method: 'GET',
				headers: headers,
				params: params,
				transformResponse: function (data, headersGetter, status) {
        			return {response: angular.toJson(data)};
        		}
			}
			$http(req).then(function(res) {
				vm.alimentos = JSON.parse(angular.fromJson(res.data.response));
			}, function(res) {
				manageMessages.requisitionGetError(res);
			});
		}

		var alimentoSelecionadoStatus;

		vm.changeVisibilityAlimento = changeVisibilityAlimento;
		function changeVisibilityAlimento(origin){		
			$rootScope.show.alimento = !($rootScope.show.alimento);
			if(origin == 'new'){
				$rootScope.show.new = !($rootScope.show.new);
				alimentoSelecionadoStatus = true;
			}
			if(origin == 'edit'){
				$rootScope.show.edit = !($rootScope.show.edit)
				alimentoSelecionadoStatus = false;
			}
			if($rootScope.show.alimento)
				vm.getAlimentos();
		}

		vm.alimentoSelecionado = alimentoSelecionado;
		function alimentoSelecionado(alimento){
			if(alimentoSelecionadoStatus){
				changeVisibilityAlimento('new');	
			}else{
				changeVisibilityAlimento('edit');
			}
			vm.alimento.nome = alimento.nomeAlimento;
			angular.forEach(vm.alimentos, function(value, key){
				if(value.nomeAlimento == vm.alimento.nome)
					vm.alimento.id = value.idAlimento;
			})
		}

		console.log("vm", vm);
	};