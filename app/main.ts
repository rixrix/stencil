/// <reference path="./main.d.ts" />

/******************************************************************************
 * NOTE: Most of the time you don't have to modify the codes here.
 *       Check `./app.component.ts` for apps routes, behaviours, etc
 *****************************************************************************/

// load polyfill/vendor libraries
import './libs';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';

import { PLATFORM_PROVIDERS } from './platform';
import { APP_COMPONENT_ROUTES, APP_COMPONENT_BASE_HREF } from './app.component.routes';
import { AppComponent } from './app.component';

/******************************************************************************
 * Angular bootstrap/setup section
 *****************************************************************************/

bootstrap(AppComponent, [
    ...PLATFORM_PROVIDERS,
    provideRouter(APP_COMPONENT_ROUTES),
    APP_COMPONENT_BASE_HREF
])
.then(success => console.log(`Bootstrap success`))
.catch(error => console.log(error));
