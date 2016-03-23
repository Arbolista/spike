const ENDPOINT = '/data/v1/example';

class ExampleApi {
  // replace with jQuery.ajax, etc
  static index(params){
    return jQuery.ajax({
      url: "/data/v1/examples",
      type: "GET",
      dataType: "json"
    }).then((res)=>{
      return res.data;
    });
  }

}

export default ExampleApi;
