/*eslint-env node*/

import gulp from 'gulp';
import yargs from 'yargs';

import build from './build-tools/build';

gulp.task('build', function(done) {
  process.env.NODE_ENV = yargs.argv.env || 'development';
  build(yargs.argv, done);
});
