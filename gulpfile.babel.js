/*eslint-env node*/

import gulp from 'gulp';
import gulpCopy from 'gulp-copy';
import yargs from 'yargs';
import webpack from 'webpack';
import gutil from 'gulp-util';
import fs from 'fs';

import FsHelper from './build-tools/fs_helper';
import ComponentMapWriter from './build-tools/component_map_writer';

gulp.task('build', function(done) {
  process.env.NODE_ENV = yargs.argv.env || 'development';

  // write template map.
  ComponentMapWriter.write(__dirname + `/client/config/${process.env.NODE_ENV}/component_map.js`)
    .then(()=>{

    // build assets/app.js and assets/style.css
      var config = require(__dirname + `/client/config/${process.env.NODE_ENV}/webpack.js`);
      webpack(config, function(err, stats) {
        if (err){ console.error(err); done(); return false; }
        gutil.log('[webpack]', stats.toString({}));

        if (process.env.NODE_ENV === 'design'){
          var path = 'client/build/design/components';
        // copy all react templates and their styles sheets into build/design/components.
          FsHelper.rmdirAsync(path, ()=>{
            fs.mkdir(path, ()=>{
              gulp.src([
              'client/app.scss'
            ]).pipe(gulpCopy(path, {prefix: 1}));

              FsHelper.walk('client/components', (err, files)=>{
              if (err){ console.error(err); done(); return false; }
              var files_to_copy = files.filter((file)=>{
                return /\.(template\.html|scss)$/.test(file)
              });
              gulp.src(files_to_copy)
                .pipe(gulpCopy(path, {prefix: 2}));
              done()
            });
            });
          });
        } else {
          done();
        }
      });
    });
});
