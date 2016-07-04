import BaseApi from './base.api';
import uuid from 'node-uuid';

export default class ExampleApi extends BaseApi {

  login(){
    return this.delayResolve(uuid.v4());
  }

  logout(){
    return this.delayResolve();
  }

}
