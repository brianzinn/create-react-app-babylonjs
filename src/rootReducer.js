import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

// import your Module reducers here and combine them
import withProps from './withProps/reducers'
import layout from './layout/reducers'

const rootReducer = (history) => combineReducers({
	router: connectRouter(history),
	withProps,
	layout
});

export default rootReducer;