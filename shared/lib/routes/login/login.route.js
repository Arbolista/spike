/*global*/

import RouteBase from '../route.base';

class Login extends RouteBase {

  get route_name(){
    return 'Login';
  }

  get component(){
    return require('shared/components/layouts/login/login.component');
  }

}

export default Login;

