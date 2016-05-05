/*eslint-env node*/
/*global Promise console*/

import yargs from 'yargs';
import webpack from 'webpack';
import path from 'path';

import FsHelper from './fs_helper';
import ComponentMapWriter from './component_map_writer';
import ViewCompiler from './view_compiler';
import {VENDORS} from './../client/config/design/style';

process.env.NODE_ENV = yargs.argv.env || 'development';

export default function build(options, done){
  // build assets/app.js and assets/style.css with webpack
  let config = require(__dirname + `/../client/config/${process.env.NODE_ENV}/webpack.js`);
  webpack(config, function(err, _stats) {
    if (err){
      console.error('=== Error building webpack config ===')
      console.error(err);
      return done();
    }

    if (process.env.NODE_ENV === 'design') copyDesignApp(done);
  });
}

const NODE_MODULE_FILE_TYPES = /\.(otf|woff|woff2|ttf|eot|json|png|jpg|svg|css)$/,
    VENDOR_PATHS = VENDORS.map((module_name)=>{
      return {
        path: `${__dirname}/../node_modules/${module_name}`,
        name: module_name
      };
    });

function copyDesignApp(done){
  let design_build_path = path.normalize(__dirname + '/../client/build/design'),
      asset_path = design_build_path + '/assets',
      dont_remove_paths = [asset_path + '/sass', asset_path + '/app.js'].concat(VENDOR_PATHS);
  FsHelper.rmDir(design_build_path, {except: dont_remove_paths})
    .then(()=>{
      return FsHelper.mkDir(design_build_path)
    })
    .then(()=>{
      console.info('writing template map...')
      // write template map.
      return ComponentMapWriter.write(__dirname + `/../client/config/${process.env.NODE_ENV}/component_map.js`)
    })
    .then(()=>{
      // copy client/assets into build/design/assets
      console.info('copying client/assets...')
      return FsHelper.copy(__dirname + '/../client/assets', asset_path)
    }, done)
    .then(()=>{
      console.info('copying shared/components...')
      // copy component templates and styles
      return FsHelper.copy(__dirname + '/../shared/components', design_build_path + '/components', {ext: /\.(rt\.html|scss)$/})
    }, done)
    .then(()=>{
      // copy vendor assets (only given file types - don't copy if already present)
      let promises = VENDOR_PATHS.map((vendor)=>{
        console.info(`copying ${vendor}...`)
        return FsHelper.copy(vendor.path, asset_path + '/' + vendor.name, {ext: NODE_MODULE_FILE_TYPES, clobber: false})
      })
      return Promise.all(promises);
    })
    .then(()=>{
      console.info('compiling index.ejs...')
      // Compile index.ejs to html for use by design build.
      let index_path = __dirname + '/../server/views/index.ejs';
      return ViewCompiler.toS(index_path, {meta: {}, prerender_data: false, prerender_content: false})
    })
    .then((compiled_index)=>{
      console.info('writing index.html...')
      // write compiled index to design build.
      let index_dest = design_build_path + '/index.html';
      return FsHelper.writeFile(index_dest, compiled_index);
    })
    .catch((err)=>{
      console.error(err);
    })
    .then(done);
}
