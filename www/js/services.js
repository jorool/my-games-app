'use strict';

angular.module('app.services', [])

    .factory('Game', [function () {

        function generateId() {
            var id = '';
            while (id.length < 10) {
                id += String.fromCharCode(Math.floor(Math.random() * 64) + 32);
            }
            return id;
        }

        function addGame(game, callback) {
            var games = JSON.parse(localStorage.getItem('my-games-games'));
            if (!games)
                games = [];

            if (!game.id) {
                game.id = generateId();
            } else {
                var index = -1;
                angular.forEach(games, function (g) {
                    if (g.id === game.id)
                        index = games.indexOf(g);
                });
                games.splice(index, 1);
            }
            games.push(game);

            localStorage.setItem('my-games-games', JSON.stringify(games));

            callback();
        }

        function getMyGames(callback) {
            var games = JSON.parse(localStorage.getItem('my-games-games'));
            if (games) {
                callback(games);
            } else {
                callback([]);
            }
        }

        function deleteGame(game, callback) {
            var games = JSON.parse(localStorage.getItem('my-games-games'));

            var index = -1;
            angular.forEach(games, function (g) {
                if (g.id === game.id)
                    index = games.indexOf(g);
            });

            games.splice(index, 1);

            localStorage.setItem('my-games-games', JSON.stringify(games));

            callback();
        }

        return {

            addGame: function (game, callback) {
                addGame(game, callback);
            },

            getMyGames: function (callback) {
                return getMyGames(callback);
            },

            delete: function (game, callback) {
                deleteGame(game, callback);
            }
        }

    }])

    .factory('Platform', function ($http) {

        function getPlatforms(callback) {
            $http.get('api/platforms.json')
                .then(function (response) {
                    callback(response);
                });
        }

        function getMyPlatforms() {
            return JSON.parse(localStorage.getItem('my-games-platforms'));
        }

        function addToMyPlatforms(platform, callback) {
            var platforms = JSON.parse(localStorage.getItem('my-games-platforms'));
            if (!platforms) {
                platforms = [];
            }
            platforms.push(platform);
            localStorage.setItem('my-games-platforms', JSON.stringify(platforms));
            callback();
        }

        function removeFromMyPlatforms(platform, callback) {
            var platforms = JSON.parse(localStorage.getItem('my-games-platforms'));
            angular.forEach(angular.copy(platforms), function (p, index) {
                if (p.id == platform.id) {
                    platforms.splice(index, 1);
                }
            });
            localStorage.setItem('my-games-platforms', JSON.stringify(platforms));
            callback();
        }

        return {
            getPlatforms: function (callback) {
                return getPlatforms(callback);
            },

            getMyPlatforms: function () {
                return getMyPlatforms();
            },

            addToMyPlatforms: function (platform, callback) {
                return addToMyPlatforms(platform, callback);
            },

            removeFromMyPlatforms: function (platform, callback) {
                return removeFromMyPlatforms(platform, callback);
            }
        }

    })

    .factory('Message', ['$ionicPopup', '$translate', function ($ionicPopup, $translate) {

        function _success(title, text) {
            $ionicPopup.alert({
                title: title,
                template: text
            });
        }
        
        return {
            success: function (text, title) {
                title = title || 'Success!';
                $translate([title, text]).then(function (translations) {
                    _success(translations[title], translations[text]);
                });
            }
        }

    }]);

// .factory('$localstorage', ['$window', function ($window) {
//     return {
//         set: function (key, value) {
//             $window.localStorage[key] = value;
//         },
//
//         get: function (key, defaultValue) {
//             return $window.localStorage[key] || defaultValue;
//         },
//
//         setObject: function (key, value) {
//             $window.localStorage[key] = JSON.stringify(value);
//         },
//
//         getObject: function (key) {
//             return JSON.parse($window.localStorage[key] || '{}');
//         }
//     }
// }]);
