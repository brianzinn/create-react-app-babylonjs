import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './layout';
import Sample1 from './sample/components/Sample1';
import Home from './home/components'

export const routes = (
    <Layout>
        <Switch>
            <Route exact={true} path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route path={`${process.env.PUBLIC_URL}/sample`} component={Sample1} />
        </Switch>
    </Layout>
);