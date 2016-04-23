/// <reference path="../libs.d.ts" />

import {
    Component,
    AfterContentInit,
    ElementRef
} from 'angular2/core';

@Component({
    selector: 'home',
    template: require('./home-component.html')
})

export class HomeComponent {
    constructor(private element: ElementRef) {
        // no-op
    }
}
