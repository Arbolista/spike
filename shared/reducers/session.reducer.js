import * as Immutable from 'immutable';
import { loop, Effects } from 'redux-loop';
import { createAction, createReducer } from 'redux-act';

import SessionApi from 'api/session.api';

const login = createAction('Login and set token from api.'),
    loggedIn = createAction('User successfully logged in.'),
    loggedOut = createAction('User successfully logged out throug api.'),
    sessionError = createAction('Problem logging in or out.'),
    logout = createAction('Logout and erase token from api.');

export { login, logout };

const BLANK_SESSION = { token: null };

/*
{
  token: <String>,
  loading: <Boolean>,
  load_error: <Boolean>
}
*/

const ACTIONS = {

  [login]: (current_session)=>{
    return loop(
      current_session.set('loading', true),
      Effects.promise(()=>{
        let api = new SessionApi();
        return api.login()
          .then(loggedIn)
          .catch(sessionError);
      })
    )
  },

  [loggedIn]: (_current_session, new_token)=>{
    let Cookies = require('cookies-js');
    window.localStorage.setItem('token', new_token);
    Cookies.set('token', new_token);
    return Immutable.fromJS({token: new_token});
  },

  [sessionError]: (_current_session, _res)=>{
    return current_session.set('load_error', true);
  },

  [logout]: (current_session)=>{
    return loop(
      current_session
        .set('loading', true)
        .set('token', null),
      Effects.promise(()=>{
        let api = new SessionApi();
        return api.logout()
          .then(loggedOut)
          .catch(sessionError);
      })
    )
  },

  [loggedOut]: (_current_session, _res)=>{
    let Cookies = require('cookies-js');
    window.localStorage.clear();
    Cookies.set('token', undefined);
    return Immutable.fromJS(BLANK_SESSION);;
  }

};

const REDUCER = createReducer(ACTIONS);

export default REDUCER;
