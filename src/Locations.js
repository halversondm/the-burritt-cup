import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Post from './Post';

class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                    "title": "",
                    "subtitle": "",
                    "metatitle": "",
                    "images": [
                        {
                            "location": "",
                            "title": "",
                            "alt": ""
                        }
                    ]
                }
            ]
        }
    }

    componentWillMount() {
        fetch('data/locations.json')
            .then(response => response.json())
            .then(json => this.setState({ locations: json }));
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <h1>Locations</h1>
                    </Col>
                </Row>
                {this.state.locations.map((location, i) => {
                    return (
                        <Post key={i} title={location.title} subtitle={location.subtitle} metatitle={location.metatitle} images={location.images} summary={location.summary} awards={location.awards} />
                    );
                })}
            </Container>
        );
    }
}

export default Locations;