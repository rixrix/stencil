/// <reference path="../libs.d.ts" />

export class MainController {
    static $inject = ['$scope'];

    constructor($scope: ng.IScope) {
    }
}

import _appModule = require('app-module');
_appModule.controller('MainController', MainController);