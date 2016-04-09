// Configure this with test data.
class ExampleApi{
  static index(done){
    return Promise.resolve([
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
      ]);
  }
}

export default ExampleApi;
