/*eslint-env node*/
/*global Promise*/

import yargs from 'yargs';
import webpack from 'webpack';
import path from 'path';

import FsHelper from './fs_helper';
import ComponentMapWriter from './component_map_writer';
import ViewCompiler from './view_compiler';

process.env.NODE_ENV = yargs.argv.env || 'development';

export default function build(options, done){
  // write template map.
  ComponentMapWriter.write(__dirname + `/../client/config/${process.env.NODE_ENV}/component_map.js`)
    .then(()=>{
      // build assets/app.js and assets/style.css with webpack
      let config = require(__dirname + `/../client/config/${process.env.NODE_ENV}/webpack.js`);

      webpack(config, function(err, _stats) {
        if (err){
          console.error('=== Error building webpack config ===')
          console.error(err);
          return done();
        }

        if (process.env.NODE_ENV === 'design') copyDesignComponents(done);
      });
    })
}



function copyDesignComponents(done){
  let design_build_path = path.normalize(__dirname + '/../client/build/design'),
      asset_path = design_build_path + '/assets'
  FsHelper.rmDir(design_build_path, {except: [asset_path + '/sass', asset_path + '/app.js', asset_path + '/style.css']})
    .then(()=>{
      return FsHelper.mkDir(design_build_path)
    }, done)
    .then(()=>{
      // copy app.scss to build/design
      return FsHelper.copy(__dirname + '/../client/app.scss', asset_path)
    }, done)
    .then(()=>{
      return FsHelper.walk(__dirname + '/../shared/components')
    }, done)
    .then((files)=>{
      // copy all React Templates and .scss files to build/design/components
      let files_to_copy = files.filter((file)=>{
            return /\.(rt\.html|scss)$/.test(file)
          }),
          promises = files_to_copy.map((file)=>{
            return FsHelper.copy(file, design_build_path + '/components', {prefix: 1});
          });
      return Promise.all(promises);
    }, done)
    .then(()=>{
      // Combile index.ejs to html for use by design build.
      let index_path = __dirname + '/../server/views/index.ejs';
      return ViewCompiler.toS(index_path, {meta: {}, prerender_data: false, prerender_content: false})
    }, done)
    .then((compiled_index)=>{
      // write compiled index to design build.
      let index_dest = design_build_path + '/index.html';
      return FsHelper.writeFile(index_dest, compiled_index);
    }, done)
    .then(done, done);
}
