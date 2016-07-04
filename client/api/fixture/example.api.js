import _ from 'lodash';
import BaseApi from './base.api';

const USERS = {
  1: {id: 1, first_name: 'John', last_name: 'Jester'},
  2: {id: 2, first_name: 'Sally', last_name: 'Sewer'},
  3: {id: 3, first_name: 'Bob', last_name: 'Baker'}
};

const DETAILS = {
  1: {skills: 'Jokes'},
  2: {skills: 'Knitting'},
  3: {skills: 'Donuts'}
}

export default class ExampleApi extends BaseApi {

  index(){
    return this.delayResolve(_.values(USERS));
  }

  show(user_id){
    return this.delayResolve(DETAILS[user_id]);
  }

}
