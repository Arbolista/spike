/*eslint-env node*/

import gulp from 'gulp';
import yargs from 'yargs';
import template from 'gulp-template';
import rename from 'gulp-rename';
import foreach from 'gulp-foreach';

import build from './build-tools/build';
import generateHelper from './build-tools/generate_helper';

import fnGenerate from './build-tools/generators/commons.generator';
import componentGenerator from './build-tools/generators/component.generator';
import layoutGenerator from './build-tools/generators/layout.generator';

gulp.task('build', function(done) {
  process.env.NODE_ENV = yargs.argv.env || 'development';
  build(yargs.argv, done);
});

gulp.task('generate-layout',layoutGenerator);

gulp.task('generate-component',componentGenerator);
