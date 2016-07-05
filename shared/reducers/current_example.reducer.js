import { fromJS } from 'immutable';
import { loop, Effects } from 'redux-loop';
import { createAction, createReducer } from 'redux-act';

import ExampleApi from 'api/example.api';

const detailExample = createAction('Ensure examples from api are in store.'),
    detailsRetrieved = createAction('Details retrieved from api.'),
    apiError = createAction('Error downloading data from api.');

export { detailExample };

/*
{
  id: <Integer>,
  skills: <String>,

  loading: <Boolean>,
  load_error: <Boolean>
}
*/

const ACTIONS = {

  [detailExample]: (current_example, data)=>{
    if (!current_example || current_example.get('id') !== data.id){
      return loop(
        fromJS({id: data.id, loading: true}),
        Effects.promise(()=>{
          let api = new ExampleApi(data.token);
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

    return fromJS(api_data);
  },

  [apiError]: (_examples_data, _res)=>{
    return fromJS({load_error: true});
  }


};

const REDUCER = createReducer(ACTIONS, null);

export default REDUCER;
