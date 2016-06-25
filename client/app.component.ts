import 'rxjs/Rx'; // load the full rxjs
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { HomeComponent } from './home/home-component';

@Component({
    selector: 'stencil-app',
    directives: [
        ROUTER_DIRECTIVES,
        HomeComponent
    ],
    template: `
        <home></home>
    `,
    styles: [
        require('./app.component.scss').toString()
    ],
    encapsulation: ViewEncapsulation.None
})

/******************************************************************************
 * Main application routes
 *****************************************************************************/

@RouteConfig([
    { path: '/', name: 'HomePage', component: HomeComponent, useAsDefault: true }
])

export class AppComponent {
    constructor() {}
}
