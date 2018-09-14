import { combineReducers } from 'redux';

// import your Module reducers here and combine them
import withProps from './withProps/reducers'

const rootReducer = combineReducers({
	withProps
	// additional reducers go here.
});

export default rootReducer;