/*global Promise*/

// Configure this with test data.
class ExampleApi{
  static index(){
    return Promise.resolve([
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
    ]);
  }
}

export default ExampleApi;
