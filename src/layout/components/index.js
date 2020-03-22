import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'reactstrap';
import Octicon, { Home, TriangleRight, MarkGithub } from '@githubprimer/octicons-react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { toggleSidebar } from '../reducers'
import './layout.css'

class Layout extends Component {

    render() {
        var sideBarClassNames = classNames({
            'active': !this.props.showSidebar
        })

        var sideBarCollapseClassNames = classNames(
            {'active': !this.props.showSidebar},
            'navbar-btn'
        )

        return (
            <div>
                <div className="wrapper">
                    <nav id="sidebar" className={sideBarClassNames}>
                        <div className="sidebar-header">
                            <h3 className="sidebar-h3">React + BabylonJS</h3>
                        </div>

                        <ul className="list-unstyled components">
                            <h3 className="sidebar-h3">Examples</h3>
                            <NavItem>
                                <NavLink exact={true} to={`${process.env.PUBLIC_URL}/`} activeClassName="active" className="nav-link">
                                        <Octicon icon={Home}/> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={`${process.env.PUBLIC_URL}/defaultPlayground`} activeClassName="active" className="nav-link">
                                    <Octicon icon={ TriangleRight }/> Default Playground
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={`${process.env.PUBLIC_URL}/withProps`} activeClassName="active" className="nav-link">
                                    <Octicon icon={ TriangleRight }/> Props
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={`${process.env.PUBLIC_URL}/dragNdrop`} activeClassName="active" className="nav-link">
                                    <Octicon icon={ TriangleRight }/> Drag'n'drop
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={`${process.env.PUBLIC_URL}/withModel`} activeClassName="active" className="nav-link">
                                    <Octicon icon={ TriangleRight }/> Model
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={`${process.env.PUBLIC_URL}/withVR`} activeClassName="active" className="nav-link">
                                    <Octicon icon={ TriangleRight }/> VR
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={`${process.env.PUBLIC_URL}/with2DUI`} activeClassName="active" className="nav-link">
                                    <Octicon icon={ TriangleRight }/> Panel (+2D UI)
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={`${process.env.PUBLIC_URL}/withSkybox`} activeClassName="active" className="nav-link">
                                    <Octicon icon={ TriangleRight }/> Skybox (+3D panel)
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={`${process.env.PUBLIC_URL}/nonDeclarative`} activeClassName="active" className="nav-link">
                                    <Octicon icon={ TriangleRight }/> Non-Declarative
                                </NavLink>
                            </NavItem>                            
                        </ul>
                        <ul className="list-unstyled CTAs">
                            <li>
                                <a href="https://github.com/brianzinn/create-react-app-babylonjs" className="download">this project <Octicon icon={ MarkGithub }/></a>
                            </li>
                            <li>
                                <a href="https://github.com/brianzinn/react-babylonjs" className="download">react-babylonjs <Octicon icon={ MarkGithub }/></a>
                            </li>
                        </ul>
                    </nav>
                    <div id="content">
                        <Navbar color="dark" className="navbar-dark" expand>
                            <button type="button" id="sidebarCollapse" className={sideBarCollapseClassNames} onClick={this.props.onToggleSidebar}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink exact={true} to={`${process.env.PUBLIC_URL}/`} activeClassName="active" className="nav-link">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`${process.env.PUBLIC_URL}/defaultPlayground`} activeClassName="active" className="nav-link">Default Playground</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`${process.env.PUBLIC_URL}/withProps`} activeClassName="active" className="nav-link">Props</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`${process.env.PUBLIC_URL}/dragNdrop`} activeClassName="active" className="nav-link">Drag 'n' Drop</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`${process.env.PUBLIC_URL}/withModel`} activeClassName="active" className="nav-link">Model</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`${process.env.PUBLIC_URL}/withVR`} activeClassName="active" className="nav-link">VR</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`${process.env.PUBLIC_URL}/withSkybox`} activeClassName="active" className="nav-link">Skybox (+3D panel)</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`${process.env.PUBLIC_URL}/with2DUI`} activeClassName="active" className="nav-link">UI (+2D panel)</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`${process.env.PUBLIC_URL}/nonDeclarative`} activeClassName="active" className="nav-link">Non-Declarative</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                        <div style={{marginTop: '-35px'}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    sidebarCollapsed: PropTypes.bool.isRequired,
    onToggleSidebar: PropTypes.func.isRequired
  }
  
const mapDispatchToProps = dispatch => {
    return {
        onToggleSidebar: () => {
           dispatch(toggleSidebar())
        }
    }
}
  
const mapStateToProps = state => {
return state.layout
}
  
const LayoutConnected = withRouter(
    connect(mapStateToProps,mapDispatchToProps)(Layout)
)
  
export default LayoutConnected
