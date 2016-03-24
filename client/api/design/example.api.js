class ExampleApi {
  static index(params){
    return Promise.resolve([
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
      ]);
  }

}

export default ExampleApi;
