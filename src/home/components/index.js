import React from 'react'
import Octicon, { TriangleRight} from '@githubprimer/octicons-react'
import {
  NavLink
} from 'react-router-dom'

const Home = () => (
  <div>
    Some samples
    <NavLink to={`${process.env.PUBLIC_URL}/defaultPlayground`} activeClassName="active" className="nav-link">
      <Octicon icon={TriangleRight}/> Default Playground
    </NavLink>
    <NavLink to={`${process.env.PUBLIC_URL}/withProps`} activeClassName="active" className="nav-link">
      <Octicon icon={TriangleRight}/> With React Props
    </NavLink>
    <NavLink to={`${process.env.PUBLIC_URL}/withModel`} activeClassName="active" className="nav-link">
      <Octicon icon={TriangleRight}/> With Model
    </NavLink>
  </div>
)

export default Home