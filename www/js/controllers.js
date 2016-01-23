angular.module('app.controllers', [])

    .controller('gamesCtrl', function ($scope) {

        $scope.createGame = function () {
            $scope.creatingGame = true;
            $scope.game = {};
        };

        $scope.cancel = function () {
            console.log('cancel');
            $scope.creatingGame = false;
            $scope.game = undefined;
        };

        $scope.save = function () {
            console.log('save');
        };

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
