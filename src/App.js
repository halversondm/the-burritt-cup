import React from 'react';
import {useState, useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Main from "./Main";
import Locations from './Locations';
import Players from './Players';
import Awards from './Awards';

export default function App() {
    
    const [state, setState] = useState(
        {navbarClass: "navbar-custom", previousTop: 0}
    )

    useEffect(() => {
        window.addEventListener('scroll', scrollingNavBar);
        return () => window.removeEventListener('scroll', scrollingNavBar);
    })

    function scrollingNavBar(event) {
        let currentTop = window.scrollY;
        if (currentTop === 0) {
            // at the top
            setState({navbarClass: "navbar-custom", previousTop: currentTop});
        } else if (currentTop < state.previousTop) {
            //if scrolling up...
            if (currentTop > 0 && state.navbarClass.includes('is-fixed')) {
                // make the navbar visible to the user near the top
                setState({navbarClass: "navbar-custom is-visible is-fixed", previousTop: currentTop});
            } else {
                // otherwise you are at the top and remove the classes during scrolling
                setState({navbarClass: "navbar-custom", previousTop: currentTop});
            }
        } else if (currentTop > state.previousTop) {
            //if scrolling down... pull the navbar down with you.
            setState({navbarClass: "navbar-custom is-fixed", previousTop: currentTop});
        }
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" className={state.navbarClass}>
                <Navbar.Toggle aria-controls="bs-example-navbar-collapse-1"/>
                <Navbar.Brand href="/">The Burritt Cup</Navbar.Brand>
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
            <header className="intro-header burritt-cup-logo"/>
            <Routes>
                <Route path="/" exact element={<Main/>}/>
                <Route path="/locations" element={<Locations/>}/>
                <Route path="/players" element={<Players/>}/>
                <Route path="/awards" element={<Awards/>}/>
            </Routes>
            <hr/>
            <footer>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={8} md={10}>
                            <ul className="list-inline text-center">
                                <li>
                                    <a href="https://twitter.com/TheBurrittCup">
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-circle fa-stack-2x"/>
                          <i className="fa fa-twitter fa-stack-1x fa-inverse"/>
                        </span>
                                    </a>
                                </li>
                            </ul>
                            <p className="copyright text-muted">Copyright &copy; The Burritt
                                Cup {new Date().getFullYear()}</p></Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}
