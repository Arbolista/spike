import * as Immutable from 'immutable';
import { loop, Effects } from 'redux-loop';
import { createAction, createReducer } from 'redux-act';

import ExampleApi from 'api/example.api';

const setCurrentExample = createAction('Ensure examples from api are in store.'),
    detailsRetrieved = createAction('Details retrieved from api.'),
    apiError = createAction('Error downloading data from api.');

export { setCurrentExample };

/*
{
  id: <Integer>,
  skills: <String>,

  load_error: <Boolean>
}
*/

const ACTIONS = {

  [setCurrentExample]: (current_example, data)=>{
    if (current_example.get('id') !== data.id){
      return loop(
        null,
        Effects.promise(()=>{
          let api = new ExampleApi(token);
          return api.show(data.id)
            .then((api_data)=>{
              api_data.id = data.id;
              return detailsRetrieved(api_data);
            })
            .catch(apiError);
        })
      )
    }
    return current_example;
  },

  // example_data from API response.
  [detailsRetrieved]: (_examples_data, api_data)=>{
    api_data.loading = false;

    return Immutable.fromJS(api_data);
  },

  [apiError]: (_examples_data, _res)=>{
    return Immutable.fromJS({load_error: true});
  }


};

const REDUCER = createReducer(ACTIONS, null);

export default REDUCER;
