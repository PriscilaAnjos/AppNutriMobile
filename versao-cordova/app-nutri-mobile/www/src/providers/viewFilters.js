angular.module("appNutri.filters", [])
	
	.filter("dayOfWeek", dayOfWeek);

	dayOfWeek.$inject = ['$filter'];

	function dayOfWeek($filter){
		return function(day){
			const day_en = $filter('date')(day, 'EEEE');

			switch(day_en){
				case 'Sunday': 		return 'Domingo'; 			break;
				case 'Monday': 		return 'Segunda-feira'; 	break;
				case 'Tuesday': 	return 'Terça-feira'; 		break;
				case 'Wednesday': 	return 'Quarta-feira'; 		break;
				case 'Thursday': 	return 'Quinta-feira'; 		break;
				case 'Friday': 		return 'Sexta-feira'; 		break;
				case 'Saturday': 	return "Sábado"; 			break;
				default: 			return 'Unkown date'; 		break;
			}
		}
	};
