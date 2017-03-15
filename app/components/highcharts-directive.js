'use strict';

angular
  .module('app')
  .directive('highCharts', function() {
    return {
      restrict: 'E',
      template: '<div></div>',
      controller: HighChartsController,
      transclude: true,
      scope: {
        chartType: '@',
        chartData: '=',
        chartOptions: '='
      }
    };
  });

HighChartsController.$inject = ['$scope', '$element', '$timeout'];

function HighChartsController($scope, $element, $timeout) {
  $scope.symbols = [
    'url(http://img06.deviantart.net/47f9/i/2012/127/1/f/sphere_png_version_by_didier_bernard-d4ytuk9.png)',
    'url(https://upload.wikimedia.org/wikipedia/commons/7/7a/Sphere-with-blender.png)'
    ]

  $scope.chartConfig = {
    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy',
        panning: true,
        panKey: 'shift'
    },

    tooltip: {
      formatter: function () {
        var htmlTooltip = '<h4>'+ this.series.name +'</h4><br/>';

        if (this.point.z) {
          htmlTooltip = htmlTooltip + '<p><b>'+ this.point.x +'</b>:<b>'+this.point.y+'</b> => <b>'+ this.point.z +'</b></p>';
        } else {
          htmlTooltip = htmlTooltip + '<p>'+ this.point.x +'%, '+this.point.y+'%</p>';
        }
        return htmlTooltip;
      }
    },

    title: {
      text: '%Marge brute ou commerciale',
      y: -40,
      verticalAlign: 'bottom'
    },

    legend: {
      itemDistance: 50,
      itemMarginTop: 50
    },

    xAxis: {
      gridLineWidth: 1,
      tickPosition: 'inside',
      min: -100,
      max: 100,
      plotLines: [{
        color: 'black',
        width: 2,
        value: 0
      }],
      labels: {
        align: 'center',
        y: -($('high-charts').height() /2 - 80)
      }
    },

    yAxis: {
      gridLineWidth: 1,
      title: {
        text: null
      },
      min: -100,
      max: 100,
      plotLines: [{
        color: 'black',
        width: 2,
        value: 0
      }],
      labels: {
          align: 'right',
          x: $('high-charts').width() /2 - 20
      }
    },
    series: []
  };

  activate();

  angular.element(window).bind('resize', function () {
    reDraw();
  });

  function activate() {
    var i = 0;
    if (angular.isDefined($scope.chartType)) {
      $scope.chartConfig.chart.type = $scope.chartType;
    }

    angular.forEach($scope.chartData, function(item){
      item.marker = {
          symbol: $scope.symbols[i],
          width: 16,
          height: 16
      }
      $scope.chartConfig.series.push(item);
      i = i+1;
    });

    new Highcharts.Chart($element[0], $scope.chartConfig);
    reDraw()
  }

  function reDraw() {
    $scope.chartConfig.yAxis.labels.x = $('high-charts').width() /2 - 20;
    $scope.chartConfig.xAxis.labels.y = -($('high-charts').height() /2 - 80);
    new Highcharts.Chart($element[0], $scope.chartConfig);
  }
}