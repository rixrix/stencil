import { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from '@angular/core';
import { provideRouter, ROUTER_DIRECTIVES } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
//import { REACTIVE_FORM_DIRECTIVES, disableDeprecatedForms, provideForms } from '@angular/forms';

const APPLICATION_DIRECTIVES = [
	...ROUTER_DIRECTIVES
	//...REACTIVE_FORM_DIRECTIVES
];

const DIRECTIVES = [
	{ provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];

const APPLICATION_PIPES = [
];

const PIPES = [
	{ provide: PLATFORM_PIPES, multi: true, useValue: APPLICATION_PIPES }
];

const APPLICATION_PROVIDERS = [
	...HTTP_PROVIDERS,
	{ provide: LocationStrategy, useClass: HashLocationStrategy }
];

/******************************************************************************
 * Exports all in a fat array
 *****************************************************************************/
export const PLATFORM_PROVIDERS = [
	...DIRECTIVES,
	...PIPES,
	...APPLICATION_PROVIDERS
];
