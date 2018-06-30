import React from 'react'
import { Container, Row, Col } from 'reactstrap';

import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import BabylonJSContainer from '../containers/BabylonJsContainer'
import VisibleTodoList from '../containers/VisibleTodoList'

import './app.css'

const App = () => (
  <Container>
    <Row>
      <Col sm="6">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </Col>
      <Col sm="6">
        <BabylonJSContainer />
      </Col>
    </Row>
  </Container>
)

export default App