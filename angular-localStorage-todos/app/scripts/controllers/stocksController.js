(function(){

'use strict';

angular.module('mytodoApp')
  .controller('StocksCtrl', function ($scope, $http) {
    $scope.userName = '';
    $scope.stocks = [];

    $scope.getUserInfo = function () {
      if ($scope.userName) {
        $scope.userName = $scope.userName;
      }
      $http({
          url: 'http://10.21.12.146:3000/user',
          method: 'GET',
          params: {email: $scope.userName}
        }).success(function(res){
            $scope.stocks = res.data;
          });
    };

    $scope.addStock = function() {
      var newStockName = '';
      if ($scope.newStock) {
        newStockName = $scope.newStock;
      }
      //Call API to add this new stock to the user with the $scope.userName, response should modify the scope
      $http({
          url: 'http://10.21.12.146:3000/register',
          method: 'GET',
          params: {email: $scope.userName, symbol: newStockName}
        }).success(function(res){
            $scope.stocks = res.data;
            if (res.status !== 200) {
              //show error message to client
            }
          });
    };

    $scope.removeStock = function(index) {
      //Call API to remove this new stock to the user with the $scope.userName, response should modify the scope
      $http({
          url: 'http://10.21.12.146:3000/unregister',
          method: 'GET',
          params: {email: $scope.userName, symbol: this.stock}
        }).success(function(res){
            $scope.stocks = res.data;
            if (res.status !== 200) {
              //show error message to client
            }
          });
    };

    $scope.pauseStock = function(index) {
      //Call API to pause this new stock to the user with the $scope.userName, response should modify the scope
      $http({
          url: 'http://10.21.12.146:3000/unregister',
          method: 'GET',
          params: {email: $scope.userName, symbol: this.stock}
        }).success(function(res){
            $scope.stocks = res.data;
            if (res.status !== 200) {
              //show error message to client
            }
          });
    };
  })
.directive('myStocks', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/stocks.html',
    controller: 'StocksCtrl'
  }
});
})();