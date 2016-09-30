import gulp from 'gulp';
import template from 'gulp-template';
import rename from 'gulp-rename';
import foreach from 'gulp-foreach';
import generateHelper from '../generate_helper';
import path from 'path';

// takes template
// runs it through lodash templating engine
// feeding it its name
// and then creates a copy of processed files
export function fnGenerate(name, templateDir, dest, templateName){
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
