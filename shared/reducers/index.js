import current_example from "./current_example.reducer"
import examples from "./examples.reducer"
import session from "./session.reducer"
import location from "./location.reducer"

import { combineReducers } from 'redux-loop'

const reducers = combineReducers({
		current_example:current_example,
		examples:examples,
		session:session,
		location:location
});

export default reducers;
