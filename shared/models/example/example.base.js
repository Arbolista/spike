export class Example {

  constructor(data){
    var example = this;
    example.data = data;
  }

  get id(){
    return parseInt(this.data.id);
  }

  get scoped_id(){
    var example = this;
    return `example-${example.data.id}`;
  }

  introduce(){
    var example = this;
    return "Hi, I'm " + example.data.name + '!';
  }

}

export default Example;
