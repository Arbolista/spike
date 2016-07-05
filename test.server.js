/*global GLOBAL*/

// this is run via "npm run test_server".

import Jasmine from 'jasmine'

require('app-module-path').addPath(__dirname);

var jasmine = new Jasmine()
jasmine.loadConfigFile('jasmine.json')
jasmine.execute();
