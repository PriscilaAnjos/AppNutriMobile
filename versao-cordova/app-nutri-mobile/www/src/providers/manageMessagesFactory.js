angular.module('appNutri.providers')
	.factory("manageMessages", manageMessages);

	manageMessages.$inject = [];

	function manageMessages() {
		
		function requisitionGetError(res) {
			console.log("Error", res);
		}

		function requisitionPostError(res) {
			console.log("Error", res);
		}

		function requisitionGetSuccess(res) {
			console.log("Success", res);
		}

		function requisitionPostSuccess(res) {
			console.log("Success", res);
		}

		return {
			requisitionGetError: requisitionGetError,
			requisitionPostError: requisitionPostError,
			requisitionGetSuccess: requisitionGetSuccess,
			requisitionPostSuccess: requisitionPostSuccess
		}
	};