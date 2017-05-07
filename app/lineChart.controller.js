(function() {
  'use strict';

  angular
    .module('cartProject')
    .controller('LineChartController', LineChartController);

  /** @ngInject */
  function LineChartController($scope) {

    function uniq(a) {
        return a.filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });
    }

    function occ(a){
      var x = a.reduce(function (acc, curr) {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }

      return acc;
    }, {});
      var x = $.map(x, function(value, index) {
          return [value];
      });
      return x;
    }

    $scope.$on("sendTime", function(a, param) {
      $scope.data = [];
      $scope.data.push(occ(param));
      //console.log($scope.data);
      $scope.labels = uniq(param);
      //console.log($scope.labels);
    });

    //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Zagrano aren'];
    $scope.data = [[1,2,3]];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };
  }

})();

