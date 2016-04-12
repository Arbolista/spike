/*global Promise*/

import fs from 'fs';
import ejs from 'ejs';

export default class ViewCompiler {


  static toS(filename, data){
    return new Promise((fnResolve, fnReject)=>{
      fs.readFile(filename, 'utf8', (err, result)=>{
        if (err){
          console.error('=== ViewCompiler.toS ===')
          console.error(err);
          return fnReject();
        }
        fnResolve(ejs.render(result, data))
      });
    });
  }

}
