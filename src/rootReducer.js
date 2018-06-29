import { combineReducers } from 'redux';

// import your Module reducers here and combine them
import todo from './todo/reducers'

const rootReducer = combineReducers({
	todo
	// additional reducers go here.
});

export default rootReducer;