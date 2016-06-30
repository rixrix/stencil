import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'about-component',
    template: require('./about.component.html'),
    styles: [
        require('./about.component.scss').toString()
    ]
})
export class AboutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
