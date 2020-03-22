import { createStore, compose, applyMiddleware } from 'redux';

import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
// import reduxWiretap from 'redux-wiretap'

import rootReducer from './rootReducer';

// export `history` to use in index.js, we are using `createBrowserHistory`
// we need to add options here for gh-pages if we want to use it.
export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const store = createStore(
  rootReducer(history), // new root reducer with router state
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      // reduxWiretap
      // other middleware ...
    ),
  ),
)

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    store.replaceReducer(connectRouter(history)(rootReducer))
  })
}

export default store;