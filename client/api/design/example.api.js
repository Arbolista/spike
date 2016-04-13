/*eslint-env browser*/
/*global Promise*/

class ExampleApi {
  static index(){
    return Promise.resolve([
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
    ]);
  }

}

export default ExampleApi;
