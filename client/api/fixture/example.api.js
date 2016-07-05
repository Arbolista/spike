import _ from 'lodash';
import BaseApi from './base.api';

const USERS = {
  1: {id: 1, first_name: 'John', last_name: 'Jester'},
  2: {id: 2, first_name: 'Sally', last_name: 'Sewer'},
  3: {id: 3, first_name: 'Bob', last_name: 'Baker'}
};

const DETAILS = {
  1: {skills: ['Jokes', 'Laughs']},
  2: {skills: ['Knitting', 'Crocheting']},
  3: {skills: ['Donuts', 'Pies']}
}

export default class ExampleApi extends BaseApi {

  index(){
    return this.delayResolve(USERS);
  }

  show(user_id){
    return this.delayResolve(DETAILS[user_id]);
  }

}
