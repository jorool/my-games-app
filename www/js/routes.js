angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
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
                        controller: 'gamesCtrl'
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
                        controller: 'configCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/games');

    });
