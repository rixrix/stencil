/// <reference path="libs.d.ts" />

'use strict'

/**
 * Load app-wide controllers, directives & services
 */

require('./main/main-controller');

/**
 * Import main app module
 */
import _appModule = require('app-module');

_appModule.config([
    '$httpProvider',
    '$routeProvider',
    '$locationProvider',
    function($httpProvider: ng.IHttpProvider,
             $routeProvider: ng.route.IRouteProvider,
             $locationProvider: ng.ILocationProvider) {

        $locationProvider.hashPrefix('!');

        $routeProvider
        .when('/', {
            templateUrl: 'main/main-view.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);
