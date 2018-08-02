import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './layout';
import DefaultPlayground from './defaultPlayground/components/DefaultPlayground';
import WithProps from  './withProps/components/WithProps';
import WithModel from  './withModel/components/WithModel';
import Home from './home/components'

export const routes = (
    <Layout>
        <Switch>
            <Route exact={true} path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route path={`${process.env.PUBLIC_URL}/defaultPlayground`} component={DefaultPlayground} />
            <Route path={`${process.env.PUBLIC_URL}/withProps`} component={WithProps} />
            <Route path={`${process.env.PUBLIC_URL}/withModel`} component={WithModel} />
        </Switch>
    </Layout>
);