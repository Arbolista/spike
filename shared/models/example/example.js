import ModelBase from '../model.base';

const ATTRIBUTES = ['first_name', 'last_name'];

class Example extends ModelBase {

  get attributes(){
    return ATTRIBUTES;
  }

  get full_name(){
    return `${this.first_name} ${this.last_name}`;
  }

}

export default Example;
