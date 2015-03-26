#!/usr/bin/env node

var child;
var exec = require('child_process').exec;

exec('tsd reinstall -s');
