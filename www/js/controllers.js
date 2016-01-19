angular.module('app.controllers', [])

    .controller('gamesCtrl', function ($scope) {

    })

    .controller('aboutCtrl', function ($scope) {

    })

    .controller('platformsCtrl', function ($scope, Platform) {

        Platform.getPlatforms(function (response) {
            $scope.platforms = response.data;
        });

    })

    .controller('configCtrl', function ($scope) {

    });
