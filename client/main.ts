/// <reference path="./main.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { PLATFORM_DIRECTIVES } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { PLATFORM_PIPES } from '@angular/core';
import { FORM_PROVIDERS, COMMON_DIRECTIVES, APP_BASE_HREF } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
/* tslint:disable */
import { provide } from '@angular/core';
/* tslint:enable */

import { AppComponent } from './app.component';

/******************************************************************************
 * pipes
 *****************************************************************************/
const APPLICATION_PIPES = [];
const PIPES = [
  { provide: PLATFORM_PIPES, multi: true, useValue: APPLICATION_PIPES }
];

/******************************************************************************
 * directives
 *****************************************************************************/
const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES
];
const DIRECTIVES = [
  COMMON_DIRECTIVES,
  { provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];

/******************************************************************************
 * providers
 *****************************************************************************/
const APPLICATION_PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS
];
const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];

/******************************************************************************
 * production or development mode (dev default)
 *****************************************************************************/

// enableProdMode();

/******************************************************************************
 * Angular bootstrap/setup section
 *****************************************************************************/

bootstrap(AppComponent, [
    ...PIPES,
    ...DIRECTIVES,
    ...PROVIDERS,
    { provide: APP_BASE_HREF, useValue: '/' }
])
.then(success => console.log(`Bootstrap success`))
.catch(error => console.log(error));
