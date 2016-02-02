angular.module('app.controllers', [])

    .controller('gamesCtrl', function ($scope, Platform) {

        $scope.platforms = Platform.getMyPlatforms();

        $scope.createGame = function () {
            $scope.creatingGame = true;
            $scope.game = {};
        };

        $scope.cancel = function () {
            $scope.creatingGame = false;
            delete $scope.game;
        };

        $scope.save = function (game) {
            console.log(game);
            $scope.creatingGame = false;
            delete $scope.game
        };

    })

    .controller('aboutCtrl', function ($scope) {

    })

    .controller('platformsCtrl', function ($scope, Platform, $ionicPopup) {

        function loadPlatforms() {
            Platform.getPlatforms(function (response) {
                var platforms = response.data;
                var myPlatforms = Platform.getMyPlatforms();

                angular.forEach(platforms, function (platform) {
                    angular.forEach(myPlatforms, function (myPlatform) {
                        if (myPlatform.id == platform.id) {
                            platform.selected = true;
                        }
                    });
                });

                $scope.platforms = platforms;
            });
        }

        $scope.togglePlatform = function (platform) {

            if (platform.selected) {
                Platform.addToMyPlatforms(platform, function () {
                    $ionicPopup.alert({
                        title: 'Sucesso!',
                        template: 'Plataforma adicionada.'
                    });
                });
            } else {
                Platform.removeFromMyPlatforms(platform, function () {
                    loadPlatforms();
                    $ionicPopup.alert({
                        title: 'Sucesso!',
                        template: 'Plataforma removida.'
                    });
                });
            }

        };

        loadPlatforms();
    })

    .controller('configCtrl', function ($scope) {

    });
