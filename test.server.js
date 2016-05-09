/*global GLOBAL*/

// this is run via "npm run test_server".

import Jasmine from 'jasmine'

GLOBAL.JS_ENV = 'server';
GLOBAL.DESIGN = false;

var jasmine = new Jasmine()
jasmine.loadConfigFile('jasmine.json')
jasmine.execute();
