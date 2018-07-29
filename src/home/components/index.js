import React from 'react'

import {
  NavLink
} from 'react-router-dom'

const Home = () => (
  <div>
    Some samples
    <NavLink to={`${process.env.PUBLIC_URL}/defaultPlayground`} activeClassName="active" className="nav-link">
        <span className="glyphicon glyphicon-play" /> Default Playground
    </NavLink>
    <NavLink to={`${process.env.PUBLIC_URL}/withProps`} activeClassName="active" className="nav-link">
        <span className="glyphicon glyphicon-play" /> With React Props
    </NavLink>
  </div>
)

export default Home