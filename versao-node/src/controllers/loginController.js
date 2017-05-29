angular.module('appNutri.controllers')
	.controller("loginController", loginController);

	loginController.$inject = ['$http', 'accessFactory', 'manageMessages', '$localStorage', '$rootScope'];

	function loginController($http, accessFactory, manageMessages, $localStorage, $rootScope) {
		let vm = this;
		const url = '';

		//MOCK --> {success: boolean}
		vm.loginForm = [];
		vm.loginForm.success = true;	
		vm.lembreme = false;

		vm.checkLembreme = checkLembreme();
		function checkLembreme(){
			if($localStorage.user_data){
				if($localStorage.user_data.lembreme){
					vm.loginForm.email = $localStorage.user_data.email;
					vm.loginForm.password = $localStorage.user_data.password;
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
			$rootScope.email = user.email;

			const req = {
				url: url,
				method: 'GET',
				params: user
			};

			$http(req).then(function(res) {
				accessFactory.checkAccess(vm.loginForm);
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
				"password": user.password
			};
		}

		console.log("vm", vm);
	}