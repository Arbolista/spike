import * as Immutable from 'immutable';
import { createAction } from 'redux-act';

const updateLocation = createAction('UPDATE_LOCATION');

export { updateLocation };

const BLANK_SESSION = { token: null };

/*
{
  pathname: <String>,
  query: <Object>.
  route_name: <String>,
  params: <Object>
}
*/

// No need to create action specific reducers here.
// If a new location object was added to the action payload,
// set it as the new location.
// This enables dispatching any action while simultaneously updating the location.

export default function(current_location, action){
    if (action.location){
      return Immutable.fromJS(action.location);
    }
    return current_location;
  }
