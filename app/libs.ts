/******************************************************************************
 * polyfill libraries
 *****************************************************************************/
import 'core-js/client/shim';
import 'zone.js/dist/zone';
import 'ts-helpers';

/******************************************************************************
 * vendors/3rd party libraries
 *****************************************************************************/
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';
import 'rxjs';

// AngularClass
import '@angularclass/webpack-toolkit';
import '@angularclass/request-idle-callback';

// TODO: for testing purposes only
import 'angular2-hmr';
(<any>Error).stackTraceLimit = Infinity;
require('zone.js/dist/long-stack-trace-zone');
