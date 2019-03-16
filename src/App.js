import React, { Component } from 'react';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Main from "./Main";
import Locations from './Locations';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar collapseOnSelect expand="sm" className="navbar-custom">
            <Navbar.Toggle aria-controls="bs-example-navbar-collapse-1" />
            <Navbar.Brand href="index.html">The Burritt Cup</Navbar.Brand>
            <Navbar.Collapse id="bs-example-navbar-collapse-1" className="justify-content-end">
              <Nav>
                <Nav.Item>
                  <Link className="nav-link" role="button" to="/">Home</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" role="button" to="/locations">Locations</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" role="button" to="/players">Players</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" role="button" to="/awards">Awards</Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <header className="intro-header burritt-cup-logo" />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/locations" component={Locations} />
          </Switch>
          <hr />
          <footer>
            <Container>
              <Row className="justify-content-center">
                <Col xs={8} md={10}>
                <ul className="list-inline text-center">
                    <li>
                      <a href="https://twitter.com/TheBurrittCup">
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">Copyright &copy; The Burritt Cup 2018</p></Col>
              </Row>
            </Container>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
