angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('menu', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html'
            })

            .state('menu.games', {
                url: '/games',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/games.html',
                        controller: 'gamesCtrl as ctrl',
                        resolve: {
                            platforms: function (Platform) {
                                return Platform.getMyPlatforms();
                            }
                        }
                    }
                }
            })

            .state('menu.about', {
                url: '/about',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/about.html',
                        controller: 'aboutCtrl'
                    }
                }
            })

            .state('menu.platforms', {
                url: '/platforms',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/platforms.html',
                        controller: 'platformsCtrl'
                    }
                }
            })

            .state('menu.config', {
                url: '/config',
                views: {
                    'side-menu': {
                        templateUrl: 'templates/config.html',
                        controller: 'ConfigCtrl as ctrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/games');

    });
