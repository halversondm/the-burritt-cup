import React, {useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Post from './Post';

export default function Locations() {

    const [state, setState] = useState({
        locations: [
            {
                title: "",
                subtitle: "",
                metatitle: "",
                awards: [],
                images: [
                    {
                        location: "",
                        title: "",
                        alt: ""
                    }
                ]
            }
        ]
    });

    useEffect(() => {
        fetch('data/locations.json')
            .then(response => response.json())
            .then(json => setState({locations: json}));
    })

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <h1>Locations</h1>
                </Col>
            </Row>
            {state.locations.map((location, i) => {
                return (
                    <Post key={i} title={location.title} subtitle={location.subtitle} metatitle={location.metatitle}
                          images={location.images} summary={location.summary} awards={location.awards}/>
                );
            })}
        </Container>
    );
}
