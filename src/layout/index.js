import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    Row,
    Col
} from 'reactstrap';

import {
    NavLink
} from 'react-router-dom'

class Layout extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" className="navbar-dark" expand>
                    <NavbarBrand href="/">react + BabylonJS</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink exact={true} to={'/'} activeClassName="active" className="nav-link">
                                    <span className="glyphicon glyphicon-home" /> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={'/todo'} activeClassName="active" className="nav-link">
                                    <span className="glyphicon glyphicon-play" /> Todo
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container style={{paddingTop: '10px'}}>
                    <Row>
                        <Col>
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Layout;
