/*global Promise*/

// In development, you would want to configure this to make
// AJAX calls to a locally running or staging server.
class ExampleApi{
  static index(){
    return Promise.resolve([
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
    ]);
  }
}

export default ExampleApi;
