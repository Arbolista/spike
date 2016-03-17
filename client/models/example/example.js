import ExampleApi from 'api/example.api';
class Example {

  constructor(data){
    var example = this;
    example.data = data;
  }

  get scoped_id(){
    var example = this;
    return `example-${example.data.id}`;
  }

  introduce(){
    var example = this;
    return "Hi, I'm " + example.data.name + "!";
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

Example.store = new Map();

export default Example;
