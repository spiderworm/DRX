#!/usr/bin/env node

require("babel-polyfill");
require("babel-core/register");

var DRXRunner = require('../src/runner/DRXRunner.js');

var file = process.argv[2];

var drxRunner = new DRXRunner.default(file);
