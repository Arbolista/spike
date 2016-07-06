/*global JS_ENV Map require*/

import { createStore } from 'redux';
import { install, combineReducers } from 'redux-loop';
import { fromJS } from 'immutable';

import Router from 'shared/lib/router/router';
import currentExampleReducer from 'shared/reducers/current_example.reducer';
import examplesReducer from 'shared/reducers/examples.reducer';
import sessionReducer from 'shared/reducers/session.reducer';
import locationReducer from 'shared/reducers/location.reducer';

export default class StateManager {

  initializeStore(initial_state){
    let reducer = combineReducers({
      current_example: currentExampleReducer,
      examples: examplesReducer,
      session: sessionReducer,
      location: locationReducer
    });
    this.store = createStore(reducer, initial_state, install());
  }

  // overridden in client state_manager.
  initialState(opts, cookies){
    return Object.assign({
      session: fromJS({ token: cookies.token || null })
    }, opts);
  }

  getInitialData(){
    return Promise.resolve();
  }

}
