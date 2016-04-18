/// <reference path="libs.d.ts" />

require('./main.scss');

import {
    bootstrap
} from 'angular2/platform/browser';
import {
    Component,
    provide
} from 'angular2/core';
import {
    ROUTER_PROVIDERS,
    LocationStrategy,
    PathLocationStrategy,
    ROUTER_DIRECTIVES,
    APP_BASE_HREF
} from 'angular2/router';

@Component({
    selector: 'stencil-app',
    directives: [
        ROUTER_DIRECTIVES
        ],
    template: require('./main.html')
})

export class StencilApp {
    constructor() {
        // no-op
    }
}

bootstrap(
    StencilApp, [
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: PathLocationStrategy }),
        provide(APP_BASE_HREF, { useValue: '/main' })
    ]
);
