import { Component } from '@angular/core';
import { Stream, Cell } from 'sodiumjs';

@Component({
    selector: 'home',
    template: require('./home.component.html')
})

export class HomeComponent {
    constructor() {
        console.log('Stream', Stream);
        console.log('Cell', new Cell(12));
    }
}
