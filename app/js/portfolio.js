'use strict';

angular
.module('app')
.controller('PortfolioCtrl', ['$scope', function($scope) {
  $scope.data = [
    {
      name: 'Product1',
      data: [
        [98, 5],
        [51, 50],
        [41, 22]
      ]
    },
    {
      name: 'Product2',
      data: [
        [42, 38],
        [6, 18],
        [5, 93]
      ]
    }
  ];
}]);