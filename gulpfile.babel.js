/*eslint-env node*/

import gulp from 'gulp';
import yargs from 'yargs';
import template from 'gulp-template';
import rename from 'gulp-rename';
import foreach from 'gulp-foreach';

import build from './build-tools/build';
import generateHelper from './build-tools/generate_helper';

gulp.task('build', function(done) {
  process.env.NODE_ENV = yargs.argv.env || 'development';
  build(yargs.argv, done);
});

gulp.task('generate', (done) => {
  var what = yargs.argv.what,
      name = yargs.argv.name;
  if (['component', 'layout'].indexOf(what) < 0 || !name){
    throw `Must provide --what {'component' or 'layout'} --name {String}`;
  }

  var destinationFolderName = generateHelper.data(name).componentNameLowerCase;
  if (what === 'component') {
    var destination = yargs.argv.destination || (destinationFolderName);
    fnGenerate(name, './build-tools/templates/component/*.tpl', `./shared/components/${destination}`, 'COMPONENT_NAME');
  } else if (what === 'layout'){
    // Layout will generate the route, as well as the component files.
    // Route will still need to be added to shared/lib/routes.js.
    fnGenerate(name, './build-tools/templates/route/*.tpl', `./shared/lib/routes/${destinationFolderName}`, 'ROUTE_NAME');
    fnGenerate(name, './build-tools/templates/component/*.tpl', `./shared/components/layouts/${destinationFolderName}`, 'COMPONENT_NAME');
  }

  done();
});

// takes template
// runs it through lodash templating engine
// feeding it its name
// and then creates a copy of processed files
function fnGenerate(name, templateDir, dest, templateName){
  gulp.src(templateDir)
    .pipe(foreach((stream, _file)=>{
      return stream
        .pipe(template(generateHelper.data(name)))
        .pipe(rename((path) => {
          path.basename = generateHelper.fileName(path.basename, name, templateName);
          path.extname = path.extname.replace('.tpl','');
        }))
        .pipe(gulp.dest(dest));
    }));
}
