import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import registerServiceWorker from './registerServiceWorker';

import store, { history } from './store';
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css';

const render = () => { // this function will be reused
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
};

render();

if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    })
}

registerServiceWorker();
