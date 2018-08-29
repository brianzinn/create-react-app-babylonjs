import React, { Component } from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import Octicon, { Home, TriangleRight, MarkGithub } from '@githubprimer/octicons-react'

import {
    NavLink
} from 'react-router-dom'

import './layout.css'

class Layout extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggleClass(el, className) {
        var isToggled = false

        if (el.classList) {
            isToggled = el.classList.contains(className)
        } else {
            isToggled = !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
        }

        if (isToggled) {
            if (el.classList) {
            el.classList.remove(className)
            } else {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
            }
        } else {
            if (el.classList) {
            el.classList.add(className)
            } else {
            el.className += ' ' + className
            }
        }
    }

    toggle(proxy) {
        // console.log('target', proxy.target) // can be a click on the span, using ID
        this.toggleClass(document.getElementById('sidebar'), 'active');
        this.toggleClass(document.getElementById('sidebarCollapse'), 'active');
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <nav id="sidebar">
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
                            <button type="button" id="sidebarCollapse" className="navbar-btn" onClick={this.toggle}>
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

export default Layout;
