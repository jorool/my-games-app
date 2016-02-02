angular.module('app.services', [])

    .factory('BlankFactory', [function () {

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

    });
