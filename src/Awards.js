import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Award from './Award';

class Awards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            awards: [
                {
                    image: "",
                    alt: "",
                    title: "",
                    subtitle: "",
                    metatitle: "",
                    winners: [
                        {
                            year: "",
                            name: ""
                        }
                    ]
                }
            ]
        };
    }

    componentDidMount() {
        fetch('data/awards.json')
            .then(response => response.json())
            .then(json => this.setState({awards: json}));
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <h1>Awards</h1>
                    </Col>
                </Row>
                {this.state.awards.map((award, i) => {
                    return (
                        <Award key={i} image={award.image} alt={award.alt} title={award.title} subtitle={award.subtitle} metatitle={award.metatitle} winners={award.winners} />
                    );
                })}
            </Container>
        );
    }
}

export default Awards;