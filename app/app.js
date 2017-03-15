'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/bubble-chart'});
  $routeProvider
  .when('/bubble-chart', {
    templateUrl: 'view/bubble-chart.html',
    controller: 'BubbleChartCtrl'
  })
  .when('/portfolio', {
    templateUrl: 'view/portfolio.html',
    controller: 'PortfolioCtrl'
  });
}]);
