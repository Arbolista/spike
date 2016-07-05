import * as Immutable from 'immutable';
import { loop, Effects } from 'redux-loop';
import { createAction, createReducer } from 'redux-act';

import ExampleApi from 'api/example.api';

const ensureExamples = createAction('Ensure examples from api are in store.'),
    examplesRetrieved = createAction('Examples retrieved from api.'),
    examplesRetrievalError = createAction('Error downloading data from api.');

export { ensureExamples };

/*
{
  examples: <Object{
      <Integer user_id>: <Object{
      id: <Integer>,
      first_name: <String>,
      last_name: <String>
    }>
  }>,

  load_error: <Boolean>
}
*/

const ACTIONS = {

  // Load initial data from api.

  [ensureExamples]: (examples_data, data)=>{
    if (examples_data === null){
      return loop(
        null,
        Effects.promise(()=>{
          let api = new ExampleApi(data.token);
          return api.index()
            .then(examplesRetrieved)
            .catch(examplesRetrievalError);
        })
      )
    }
    return examples_data;
  },

  // example_data from API response.
  [examplesRetrieved]: (_examples_data, api_data)=>{
    return Immutable.fromJS({examples: api_data});
  },

  [examplesRetrievalError]: (_examples_data, _res)=>{
    return Immutable.fromJS({load_error: true});
  }


};

const REDUCER = createReducer(ACTIONS, null);

export default REDUCER;
