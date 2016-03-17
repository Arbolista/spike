const ENDPOINT = '/data/v1/example';

class ExampleApi {
  // replace with jQuery.ajax, etc
  static index(params){
    return Promise.resolve([
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
      ]);
  }

}

export default ExampleApi;
