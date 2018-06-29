import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './layout';
import Todo from './todo/components/App';
import Home from './home/components'

export const routes = (
    <Layout>
        <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/todo" component={Todo} />
        </Switch>
    </Layout>
);