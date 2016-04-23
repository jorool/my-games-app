'use strict';

angular.module('app.controllers', [])

    .controller('gamesCtrl', function ($scope, $ionicActionSheet, platforms, Game, $translate) {

        $translate(['Edit', 'Delete', 'Modify', 'Cancel']).then(function (translations) {
            console.log(translations);
            $scope.Edit = translations.Edit;
            $scope.Delete = translations.Delete;
            $scope.Modify = translations.Modify;
            $scope.Cancel = translations.Cancel;
        });

        $scope.platforms = platforms;

        getGames();

        this.modify = function (game) {
            $ionicActionSheet.show({
                buttons: [
                    { text: $scope.Edit }
                ],
                destructiveText: $scope.Delete,
                titleText: $scope.Modify +' ' + game.title,
                cancelText: $scope.Cancel,
                cancel: function() {},
                buttonClicked: function(index) {
                    if (index == 0) editGame(game);
                    return true;
                },
                destructiveButtonClicked: function() {
                    Game.delete(game, function () {
                        getGames();
                    });
                    return true;
                }
            });
        };

        this.createGame = function () {
            $scope.creatingGame = true;
            $scope.game = {};
        };

        this.cancel = function () {
            $scope.creatingGame = false;
            delete $scope.game;
        };

        this.save = function (game) {
            Game.addGame(game, function () {
                $scope.creatingGame = false;
                delete $scope.game;
                getGames();
            });
        };
        
        function editGame(game) {
            $scope.creatingGame = true;
            $scope.game = angular.copy(game);
        }

        function getGames() {
            Game.getMyGames(function (games) {
                $scope.games = games;
            });
        }

    })

    .controller('aboutCtrl', function ($scope) {
    
        $scope.version = '0.0.1';

    })

    .controller('platformsCtrl', function ($scope, Platform, $ionicPopup, Message) {

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
                    Message.success('Platform added.');
                });
            } else {
                Platform.removeFromMyPlatforms(platform, function () {
                    loadPlatforms();
                    Message.success('Platform removed.');
                });
            }
        };

        loadPlatforms();
    })

    .controller('ConfigCtrl', function ($scope, $translate) {

        $scope.lang = $translate.use();

        this.changeLanguage = function (key) {
            $translate.use(key);
        };

    });
