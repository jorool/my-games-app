'use strict';

angular.module('app.controllers', [])

    .controller('gamesCtrl', function ($scope, $ionicActionSheet, platforms, Game) {

        $scope.platforms = platforms;

        getGames();

        this.modify = function (game) {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Share</b>' },
                    { text: 'Edit' }
                ],
                destructiveText: 'Delete',
                titleText: 'Modify ' + game.title,
                cancelText: 'Cancel',
                cancel: function() {},
                buttonClicked: function(index) {
                    console.log(index);
                    //0 -> share
                    
                    if (index == 1) editGame(game);
                    
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
