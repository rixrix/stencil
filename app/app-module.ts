/**
 * Shim-ified libraries into a separate bundle via `vendors.js`
 */
require('jQuery');
require('angular');
require('angular-route');
require('angular-sanitize');

/**
 * We use `gulp-angular-templatecache` to turn our `app/*.html` into a
 * loadable `$templateCache`
 *
 * @check https://docs.angularjs.org/api/ng/service/$templateCache
 */
require('./templates');

/**
 * Main application module
 */
var _appModule = angular.module('Stencil', [
    'ngRoute',
    'ngSanitize',
    'Templates'
]);

export = _appModule;