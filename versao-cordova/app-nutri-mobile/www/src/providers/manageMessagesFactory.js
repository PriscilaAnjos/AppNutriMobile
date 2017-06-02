angular.module('appNutri.providers')
	.factory("manageMessages", manageMessages);

	manageMessages.$inject = [];

	function manageMessages() {
		
		function requisitionGetError(res, status) {
   			console.log("The request failed with response " + response + " and status code " + status);
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