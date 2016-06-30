import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HttpService } from './services/http.service';

@Component({
    selector: 'stencil-app',
    encapsulation: ViewEncapsulation.None,
    template: require('./app.component.html'),
    styles: [
        require('./app.component.scss').toString()
    ],
    providers: [
        HttpService
    ],
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class AppComponent {
    constructor() {
    }
}
