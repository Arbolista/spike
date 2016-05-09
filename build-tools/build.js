/*eslint-env node*/
/*global console*/

import yargs from 'yargs';
import webpack from 'webpack';
import path from 'path';

import FsHelper from './fs_helper';
import ViewCompiler from './view_compiler';

process.env.NODE_ENV = yargs.argv.env || 'development';

export default function build(options, done){
  // build assets/app.js and assets/style.css with webpack
  let config = require(__dirname + `/../client/config/webpack/${process.env.NODE_ENV}`);
  webpack(config, function(err, _stats) {
    if (err){
      console.error('=== Error building webpack config ===')
      console.error(err);
      return done();
    }

    if (process.env.NODE_ENV === 'design') copyDesignApp(done);
  });
}

function copyDesignApp(done){
  let design_build_path = path.normalize(__dirname + '/../client/build/design'),
      asset_path = design_build_path + '/assets',
      dont_remove_paths = [asset_path + '/sass', asset_path + '/app.js', asset_path + '/css/vendor.css'];
  FsHelper.rmDir(design_build_path, {except: dont_remove_paths})
    .then(()=>{
      return FsHelper.mkDir(design_build_path)
    })
    .then(()=>{
      // copy server/assets into build/design/assets
      console.info('copying server/assets...')
      return FsHelper.copy(__dirname + '/../server/assets', asset_path)
    }, done)
    .then(()=>{
      console.info('copying shared/components...')
      // copy component templates and styles
      return FsHelper.copy(__dirname + '/../shared/components', design_build_path + '/components', {ext: /\.(rt\.html|scss)$/})
    }, done)
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
