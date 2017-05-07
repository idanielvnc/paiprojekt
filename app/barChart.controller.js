(function() {
  'use strict';

  angular
    .module('cartProject')
    .controller('BarChartController', BarChartController);

  /** @ngInject */
  function BarChartController($scope) {
$scope.labels = ["Hunter", "Warlock", "Warrior", "Rogue", "Druid", "Shaman", "Mage", "Paladin", "Priest"];

      $scope.$on("sendData", function(a, param) {
        $scope.data = param;
      });
  }

})();

