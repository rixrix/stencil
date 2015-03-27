/// <reference path="../../libs.d.ts" />

export class LandingController {
    static $inject = ['$scope'];

    constructor($scope: ng.IScope) {
    }
}

angular.module('Landing', [])
.controller('LandingController', LandingController);