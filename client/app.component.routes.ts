import { RouterConfig } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// base path
export const BASE_REF = {
    provide: APP_BASE_HREF, useValue: '/'
};

/******************************************************************************
 * Main application routes
 *****************************************************************************/

export const routes: RouterConfig = [
    { path: '', redirectTo: '/home', terminal: true },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent }
];
