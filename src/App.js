import React from 'react'
import { ConnectedRouter } from 'connected-react-router'

import { routes } from './routes'

const App = ({ history }) => ( /* receive history object via props */
    <ConnectedRouter history={history} children={routes} />
)

export default App