angular.module('appNutri.controllers')
.controller('Teste', function($scope, $http) {

  var _selected;

  console.log("CONTROLLER TESTE")

  $scope.selected = undefined;
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('http://service.appnutri.ntr.br/Geral.service.php', {
      params: {
        op: 'buscaAlimento',
        dados: {"alimento": val}
      }
    }).then(function(response){
      console.log(response);
      return response.data.map(function(item){
        console.log(item);
        return item.nomeAlimento;
      });
    }).then(function(response, status){
      console.log("STATUS", status)
      console.log("ERRO", response)
    });
  };

});