import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './layout/components';
import DefaultPlayground from './defaultPlayground';
import DragNDrop from './dragNdrop'
import WithProps from  './withProps/components/WithProps'; // has reducers, too
import WithModel from  './withModel';
import WithVR from  './withVR';
import WithSkybox from  './withSkybox';
import With2DUI from './with2DUI'
import NonDeclarative from './nonDeclarative'
import Home from './home/components'

export const routes = (
    <Layout sidebarCollapsed={false}>
        <Switch>
            <Route exact={true} path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route path={`${process.env.PUBLIC_URL}/defaultPlayground`} component={DefaultPlayground} />
            <Route path={`${process.env.PUBLIC_URL}/dragNdrop`} component={DragNDrop} />
            <Route path={`${process.env.PUBLIC_URL}/withProps`} component={WithProps} />
            <Route path={`${process.env.PUBLIC_URL}/withModel`} component={WithModel} />
            <Route path={`${process.env.PUBLIC_URL}/withVR`} component={WithVR} />
            <Route path={`${process.env.PUBLIC_URL}/withSkybox`} component={WithSkybox} />
            <Route path={`${process.env.PUBLIC_URL}/with2DUI`} component={With2DUI} />
            <Route path={`${process.env.PUBLIC_URL}/nonDeclarative`} component={NonDeclarative} />
            <Route component={Home} />
        </Switch>
    </Layout>
);