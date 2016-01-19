angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })




    .state('menu.myGames', {
      url: '/games',
      views: {
        'side-menu21': {
          templateUrl: 'templates/myGames.html',
          controller: 'myGamesCtrl'
        }
      }
    })





    .state('menu.sobre', {
      url: '/about',
      views: {
        'side-menu21': {
          templateUrl: 'templates/sobre.html',
          controller: 'sobreCtrl'
        }
      }
    })





    .state('menu.minhasPlataformas', {
      url: '/platforms',
      views: {
        'side-menu21': {
          templateUrl: 'templates/minhasPlataformas.html',
          controller: 'minhasPlataformasCtrl'
        }
      }
    })





    .state('config', {
      url: '/config',
      templateUrl: 'templates/config.html',
      controller: 'configCtrl'
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/side-menu21');

});
