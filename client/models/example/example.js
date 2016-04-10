/*global Promise window*/

import ExampleApi from 'api/example.api';
import ExampleBase from 'shared/models/example';

class Example extends ExampleBase {

  // Check for the cached data (ie Energy.store) and PrerenderData before fetching data from API.
  static ensureExamples(){
    if (Example.store.size() > 0){
      return Promise.resolve(Array.from(Example.store.values()));
    } else if (window.PrerenderData && window.PrerenderData.examples){
      for (var datum of window.PrerenderData.examples){
        Example.store.set(datum.id, new Example(datum));
      }
      return Promise.resolve(Array.from(Example.store.values()));
    } else {
      return Example.getExamples();
    }
  }

  // this is for example purposes only.
  // We should update this when we've decided on a good data store framework.
  static getExamples(){
    return ExampleApi.index()
      .then((example_data)=>{
        for (var datum of example_data){
          Example.store.set(datum.id, new Example(datum));
        }
        return Array.from(Example.store.values());
      });
  }
}

export default Example;
