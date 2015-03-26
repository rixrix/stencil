/// <reference path="libs.d.ts" />

'use strict'

require('angular/angular');
require('angular-route/angular-route');
require('angular-sanitize/angular-sanitize');

require('./templates');
require('./modules/landing/_module');

var app = angular.module('Boilerplate', [
    'ngRoute',
    'ngSanitize',
    'Templates',
    'Landing'
]);

app.config(['$httpProvider', '$routeProvider', '$locationProvider',
    function($httpProvider: ng.IHttpProvider,
             $routeProvider: ng.route.IRouteProvider,
             $locationProvider: ng.ILocationProvider)
    {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/', {
                templateUrl: 'landing/index.html',
                controller: 'LandingController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);