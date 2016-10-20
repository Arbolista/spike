import current_example from "./current_example.reducer"
import examples from "./examples.reducer"
import session from "./session.reducer"
import location from "./location.reducer"

import { combineReducers } from 'redux'

export default (intial_state) =>
	 combineReducers({
		current_example:current_example,
		examples:examples,
		session:session(intial_state),
		location:location(intial_state)
	});