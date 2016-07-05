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

  // This is server side only and should be overridden by
  // client/lib/state_manager for client side.
  initializeRouterAndStore(i18n, initial_location, cookies){
    let state_manager = this,
        router = new Router(i18n),
        initial_state = state_manager.initialState({
          location: fromJS(router.parseLocation(initial_location))
        }, cookies),
        reducer = combineReducers({
          current_example: currentExampleReducer,
          examples: examplesReducer,
          session: sessionReducer,
          location: locationReducer
        });
    state_manager.store = createStore(reducer, initial_state, install());
    return router;
  }

  initialState(opts, cookies){
    return Object.assign({
      session: fromJS({ token: cookies.token || null })
    }, opts);
  }

  getInitialData(){
    return Promise.resolve();
  }

}
