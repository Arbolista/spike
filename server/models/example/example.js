/*global Promise*/

import ExampleBase from './../../../shared/models/example';

class Example extends ExampleBase {

  // Check for the cached data (ie Energy.store) and PrerenderData before fetching data from API.
  static ensureExamples(){
    if (Example.store.size > 0){
      return Promise.resolve(Array.from(Example.store.values()));
    } else {
      return Example.getExamples();
    }
  }

  // this is for example purposes only.
  static getExamples(){
    return new Promise((fnResolve, _fnReject)=>{
      var a = [{id: 1, name: 'howdy'}, {id: 2, name: 'ho'}];
      for (var datum of a){
        Example.store.set(datum.id, new Example(datum));
      }
      fnResolve(Array.from(Example.store.values()));
    });
  }
}

export default Example;
