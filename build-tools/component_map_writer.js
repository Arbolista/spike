/*eslint-env node*/
/*global Promise*/

import FsHelper from './fs_helper';
import fs from 'fs';

class ComponentMapWriter {
  static write(path){

    return new Promise((fnResolve, fnReject)=>{
      var TEMPLATE_ROUTES = {},
          component_dir = __dirname + '/../client/components';
      FsHelper.walk(component_dir, (err, files)=>{
        if (err){
          console.error('=== ComponentMapWriter.write ===');
          console.error(`error walking path ${component_dir}`);
          console.error(err);
          return fnReject();
        }
        files.forEach((file)=>{
          if (!/\.component\.js$/.test(file)) return true;

          var rel_path = file.match(/components\/.+/)[0].replace('.component.js', ''),
              parts = file.match(/components\/([^\/]+).*\/([^\/]+)\.component\.js$/),
              template_name;
          if (parts[1] === parts[2]) template_name = parts[1];
          else template_name = parts[1] + '_' + parts[2];

          TEMPLATE_ROUTES[template_name] = rel_path;
        });

        var content = 'export const COMPONENT_MAP = ' + JSON.stringify(TEMPLATE_ROUTES);
        fs.writeFile(path, content, function(err) {
          if (err){
            console.error('=== ComponentMapWriter.write ===');
            console.error(`error writing file to ${path}`);
            console.error(err);
            return fnReject();
          }
          fnResolve();
        });
      });
    });
  }
}

export default ComponentMapWriter;
