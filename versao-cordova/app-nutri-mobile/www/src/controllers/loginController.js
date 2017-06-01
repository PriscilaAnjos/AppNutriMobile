angular.module('appNutri.controllers')
	.controller("loginController", loginController);

	loginController.$inject = ['$http', 'accessFactory', 'manageMessages', '$localStorage', '$rootScope'];

	function loginController($http, accessFactory, manageMessages, $localStorage, $rootScope) {
		const vm = this;
		const url = 'http://service.appnutri.ntr.br/Geral.service.php';
		const headers = {'Content-type': 'application/json;charset=utf-8'};
	
		vm.lembreme = false;

		vm.checkLembreme = checkLembreme();
		function checkLembreme(){
			console.log("checkLembreme")
			if($localStorage.user_data){
				console.log("primeiro if");
				if($localStorage.user_data.lembreme){
					vm.loginForm.email = $localStorage.user_data.email;
					vm.loginForm.senha = $localStorage.user_data.senha;
					vm.lembreme = $localStorage.user_data.lembreme;
				}else{
					vm.lembreme = false;
				}
			}else{
				vm.lembreme = false;
			}
		}

		vm.credentials = credentials;
		function credentials(user) {
			const params = {
				op: 'autenticacao',
				dados: {
					"email": user.email,
					"senha": user.senha
				}
			}
			
			const req = {
				url: url,
				method: 'GET',
				headers: headers,
				params: params
			};

			$http(req).then(function(res) {
				accessFactory.checkAccess(res.data);
			}, function(res) {
				manageMessages.requisitionGetError(res);
			});

			if(vm.lembreme)
				saveLembreme(user);
		}

		function saveLembreme(user){
			$localStorage.user_data =  {
				"lembreme": true,
				"email": user.email,
				"senha": user.senha
			};
		}

		console.log("vm", vm);
	};