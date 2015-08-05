'use strict';

angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope, $http, localStorageService) {

    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];
    $scope.userName = '';
    $scope.stocks = [];

    $scope.$watch('todos', function () {
      localStorageService.add('todos', $scope.todos);
    }, true);

    // Uncomment if you are disabling persistence
    //$scope.todos = [];

    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

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
      var stockName = '';
      if ($scope.userName) {
        stockName = $scope.userName;
      }
      $http({
          url: 'http://10.21.12.146:3000/unregister',
          method: 'GET',
          params: {email: $scope.userName, symbol: stockName}
        }).success(function(res){
            $scope.stocks = res.data;
            if (res.status !== 200) {
              //show error message to client
            }
          });
    };

    $scope.pauseStock = function(index) {
      var stockName = '';
      if ($scope.userName) {
        stockName = $scope.userName;
      }
      //Call API to pause this new stock to the user with the $scope.userName, response should modify the scope
      $http({
          url: 'http://10.21.12.146:3000/unregister',
          method: 'GET',
          params: {email: $scope.userName, symbol: stockName}
        }).success(function(res){
            $scope.stocks = res.data;
            if (res.status !== 200) {
              //show error message to client
            }
          });
    };
  });
