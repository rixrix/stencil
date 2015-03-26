/// <reference path="../../libs.d.ts" />

import landingCtrl = require('./landing-controller');

var _module = angular.module('Landing', [])
    .controller('LandingController', landingCtrl.LandingController);