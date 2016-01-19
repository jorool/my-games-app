angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('Platform', function($http){

  function getPlatforms(callback) {
    $http.get('api/platforms.json')
      .then(function (response) {
        callback(response);
      });
  }

  return {
    getPlatforms: function (callback) {
      return getPlatforms(callback);
    }
  }

});

