'use strict';

const deps =[
    'ionic',
    'app.controllers',
    'app.routes',
    'app.services',
    'app.directives',
    'angular.filter',
    'pascalprecht.translate',
    'ngCookies'
];

angular.module('app', deps)

    .config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'locale/locale-',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('en_US');
        $translateProvider.useLocalStorage();
    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    });
