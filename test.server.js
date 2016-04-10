// this is run via "npm run test_server".

import Jasmine from 'jasmine'

var jasmine = new Jasmine()
jasmine.loadConfigFile('jasmine.json')
jasmine.execute();
