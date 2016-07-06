/*global GLOBAL*/

// this is run via "npm run test_server".

import Jasmine from 'jasmine'
import { argv } from 'yargs';

require('app-module-path').addPath(__dirname);

const DEFAULT_FILES = [
    "server/**/*.test.js",
    "shared/**/*.test.js"
];

var jasmine = new Jasmine(),
    files = argv.files ? interpretFiles(argv.files) : DEFAULT_FILES
jasmine.loadConfig({
    "spec_dir": "./",
    "spec_files": files,
    "helpers": [
      "./server/test/helpers/**/*.test.js"
    ]
});
jasmine.execute();


function interpretFiles(files){
  return argv.files.split(',').map((dir)=>{
    if (/\.test\.js$/.test(dir)){
      return dir;
    } else {
      return `${dir}/**/*.test.js`
    }
  })
}
