import { Component, ViewEncapsulation } from '@angular/core';

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
    ]
})

export class AppComponent {
    constructor() {
    }
}
