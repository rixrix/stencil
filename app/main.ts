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

@Component({
    selector: 'stencil-app'
})

@View({
    directives: [
        ROUTER_DIRECTIVES
        ],
    template: `
        <div>angular2</div>
    `
})


export class StencilApp {
    constructor(private router: Router) {
        console.log('xxx!');
    }
}

bootstrap(
    StencilApp, [
        ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: PathLocationStrategy}),
        provide(APP_BASE_HREF, {useValue: '/main'})
    ]
)
