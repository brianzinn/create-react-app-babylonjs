import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router';

import Layout from './layout';
import DefaultPlayground from './defaultPlayground/';
import WithProps from  './withProps/components/WithProps'; // has reducers, too
import WithModel from  './withModel/';
import WithVR from  './withVR/';
import WithSkybox from  './withSkybox/';
import With2DUI from './with2DUI/'
import NonDeclarative from './nonDeclarative/'
import RemixMeshMashup from './remixMeshMashup'
import Home from './home/components'

const App = ({ history }) => ( /* receive history object via props */
    <ConnectedRouter history={history}>
        <Layout>
            <Switch>
                <Route exact={true} path={`${process.env.PUBLIC_URL}/`} component={Home} />
                <Route path={`${process.env.PUBLIC_URL}/defaultPlayground`} component={DefaultPlayground} />
                <Route path={`${process.env.PUBLIC_URL}/withProps`} component={WithProps} />
                <Route path={`${process.env.PUBLIC_URL}/withModel`} component={WithModel} />
                <Route path={`${process.env.PUBLIC_URL}/withVR`} component={WithVR} />
                <Route path={`${process.env.PUBLIC_URL}/withSkybox`} component={WithSkybox} />
                <Route path={`${process.env.PUBLIC_URL}/with2DUI`} component={With2DUI} />
                <Route path={`${process.env.PUBLIC_URL}/meshMashup`} component={RemixMeshMashup} />
                <Route path={`${process.env.PUBLIC_URL}/nonDeclarative`} component={NonDeclarative} />
                <Route render={() => (<div>Nothing here</div>)} />
            </Switch>
        </Layout>
    </ConnectedRouter>
)

export default App