/// <reference path="./main.d.ts" />

/******************************************************************************
 * NOTE: Most of the time you don't have to modify the codes here.
 *       Check `./app.component.ts` for apps routes, behaviours, etc
 *****************************************************************************/

import { bootstrap } from '@angular/platform-browser-dynamic';
import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';
import { provideRouter } from '@angular/router';

import { routes, BASE_REF } from './app.component.routes';
import { AppComponent } from './app.component';

/******************************************************************************
 * Angular bootstrap/setup section
 *****************************************************************************/

bootstrap(AppComponent, [
    ...PLATFORM_PROVIDERS,
    ...ENV_PROVIDERS,
    provideRouter(routes),
    BASE_REF
])
.then(success => console.log(`Bootstrap success`))
.catch(error => console.log(error));
