/// <reference path="libs.d.ts" />

import {
    bootstrap
} from 'angular2/platform/browser';
import {
    Component, 
    View, 
    provide, 
    enableProdMode
} from 'angular2/core';
import {
    ROUTER_PROVIDERS,
    LocationStrategy,
    PathLocationStrategy,
    ROUTER_DIRECTIVES,
    RouteConfig,
    Router,
    APP_BASE_HREF
} from 'angular2/router';