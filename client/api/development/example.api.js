const ENDPOINT = '/data/v1/example';

class ExampleApi {

  static index(params){
    return jQuery.ajax({
      url: ENDPOINT,
      data: JSON.stringify(params),
      contentType: 'application/json',
      type: 'POST',
      dataType: 'json'
    }).then((res)=>{
      return res.data;
    });
  }

}

export default ExampleApi;
