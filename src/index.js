import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import { routes } from './routes'

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history} children={routes} />
    </Provider>,
    document.getElementById('root')
   );
registerServiceWorker();
