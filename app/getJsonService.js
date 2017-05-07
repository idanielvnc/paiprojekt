(function() {
  'use strict';

  angular
    .module('cartProject')
    .service('GetJson', GetJson);

    function GetJson($http, $q) {
      return {
        getData:  function() {
          return $http.get('baza.json').then(function(response) {
            return response.data;
          });
        }
      };
    }
})();
