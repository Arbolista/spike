/*eslint-env node*/

import gulp from 'gulp';
import yargs from 'yargs';
import template from 'gulp-template';
import rename from 'gulp-rename';
import foreach from 'gulp-foreach';

import build from './build-tools/build';
import generateHelper from './build-tools/generate_helper';
import fs from 'fs';
import path from 'path';

gulp.task('build', function(done) {
  process.env.NODE_ENV = yargs.argv.env || 'development';
  build(yargs.argv, done);
});

gulp.task('generate', (done) => {
  var what = yargs.argv.what,
      name = yargs.argv.name;
  if (['component', 'layout','route'].indexOf(what) < 0 || !name){
    throw `Must provide --what {'component', 'layout' or 'route'} --name {String}`;
  }

  var destinationFolderName = generateHelper.data(name).componentNameLowerCase;
  if (what === 'component') {
    var destination = yargs.argv.where || (destinationFolderName);
    fnGenerate(name, './build-tools/templates/component/*.tpl', `./shared/components/${destination}`, 'COMPONENT_NAME');
  } else if (what === 'layout'){
    // Layout will generate the route, as well as the component files.
    // Route will still need to be added to shared/lib/routes.js.
    fnGenerate(name, './build-tools/templates/route/*.tpl', `./shared/lib/routes/${destinationFolderName}`, 'ROUTE_NAME');
    fnGenerate(name, './build-tools/templates/component/*.tpl', `./shared/components/layouts/${destinationFolderName}`, 'COMPONENT_NAME');
    fnGenerateRoutes(name,'./shared/lib/routes/','./shared/lib/');
  } else if (what === 'route') {
    //Only create the route
    //Route still need to have a component
    fnGenerate(name, './build-tools/templates/route/*.tpl', `./shared/lib/routes/${destinationFolderName}`, 'ROUTE_NAME');
    fnGenerateRoutes(name,'./build-tools/templates/routes/routes.js.tpl','./shared/lib/','./shared/lib/routes/');
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

// takes template 
// re-create routes.js with all the routes in routes/  without index and missing
// add index first and missing last
function fnGenerateRoutes(name,templateDir,dest,routesDir) {
    var routes = getFolders(routesDir);
    routes.unshift("index");
    //Add the new route name to the current routes array
    routes.push(name);
    //Missing need to be the last route
    routes.push("missing");
    var routesClassNames= [];
    for (var i = 0; i <= routes.length; i++) {
        if(routes[i] != undefined && routes[i].trim().length != 0){
          var newRoute=  generateHelper.data(routes[i]);
          newRoute.originalName=routes[i];
          routesClassNames.push(newRoute);
        }
    }
    var data = generateHelper.data(name);
    data.routesClassNames = routesClassNames;
    gulp.src(templateDir)
       .pipe(foreach((stream, _file)=>{
          return stream
            .pipe(template(data))
            .pipe(rename((path) => {
              path.basename = "routes"
              path.extname = ".js"
            }))
            .pipe(gulp.dest(dest));
       }));

}

//Gets an array of folder names in subdir
function getFolders(sourceDir) {
  return fs.readdirSync(sourceDir).filter(function(file) {
    return fs.statSync(path.join(sourceDir, file)).isDirectory() && file != 'missing' && file != 'index';
  });
}
