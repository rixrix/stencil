/// <reference path="../../libs.d.ts" />

export class MainController {
    static $inject = ['$scope'];

    constructor($scope: ng.IScope) {
    }
}

angular.module('Main', [])
.controller('MainController', MainController);