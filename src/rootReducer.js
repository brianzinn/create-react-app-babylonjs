import { combineReducers } from 'redux';

// import your Module reducers here and combine them
import withProps from './withProps/reducers'
import layout from './layout/reducers'

const rootReducer = combineReducers({
	withProps,
	layout
});

export default rootReducer;