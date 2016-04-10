/*global Map*/

export default class Example {

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
    return "Hi, I'm " + example.data.name + '!';
  }

  static get store(){
    if (!Example._store) Example._store = new Map();
    return Example._store;
  }

}
