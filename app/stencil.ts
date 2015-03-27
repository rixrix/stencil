/// <reference path="libs.d.ts" />

'use strict'

require('angular/angular');
require('angular-route/angular-route');
require('angular-sanitize/angular-sanitize');

require('./templates');
require('./main/main-controller');

var app = angular.module('Stencil', [
    'ngRoute',
    'ngSanitize',
    'Templates',
    'Main'
]);

app.config(['$httpProvider', '$routeProvider', '$locationProvider',
    function($httpProvider: ng.IHttpProvider,
             $routeProvider: ng.route.IRouteProvider,
             $locationProvider: ng.ILocationProvider)
    {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/', {
                templateUrl: 'main/index.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);