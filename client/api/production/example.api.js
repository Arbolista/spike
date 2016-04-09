// In production, you would want to configure this to make
// AJAX calls to your production server.
class ExampleApi{
  static index(){
    return Promise.resolve([
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
      ]);
  }
}

export default ExampleApi;
