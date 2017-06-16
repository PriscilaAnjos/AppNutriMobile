angular.module("appNutri.filters", [])
	
	.filter("dayOfWeek", dayOfWeek)
	.filter("withoutSpace", withoutSpace);
	
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

	function withoutSpace(){
		return function(word){
			var new_word = word.replace(" ", "%20");
			return new_word;
		}
	}
