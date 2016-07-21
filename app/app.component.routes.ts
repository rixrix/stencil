import { RouterConfig } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// base path
export const APP_COMPONENT_BASE_HREF = {
    provide: APP_BASE_HREF, useValue: '/'
};

/******************************************************************************
 * Main application routes
 *****************************************************************************/

export const APP_COMPONENT_ROUTES: RouterConfig = [
    { path: '', redirectTo: '/home', terminal: true },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent }
];
