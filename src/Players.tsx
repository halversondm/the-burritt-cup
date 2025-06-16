import {useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Player from './Player.js';

export default function Players() {

    const [state, setState] = useState({
        players: [
            {
                image: "",
                thumbnail: "",
                alt: "",
                name: "",
                office: "",
                hometown: "",
                nickname: "",
                about: ""
            }
        ]
    });

    useEffect(() => {
        fetch('data/players.json')
            .then(response => response.json())
            .then(json => setState({players: json}));
    });

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <h1>Players</h1>
                </Col>
            </Row>
            {state.players.map((player, i) => {
                return (
                    <Player key={i} image={player.image} thumbnail={player.thumbnail} alt={player.alt}
                            name={player.name} office={player.office} hometown={player.hometown}
                            nickname={player.nickname} about={player.about}/>
                );
            })}
        </Container>
    );

}
