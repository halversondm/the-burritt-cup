import {useState, useEffect} from 'react';
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
        <div className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="font-serif text-3xl font-bold text-fairway-900">Players</h1>
            {state.players.map((player, i) => {
                return (
                    <Player key={i} image={player.image} thumbnail={player.thumbnail} alt={player.alt}
                            name={player.name} office={player.office} hometown={player.hometown}
                            nickname={player.nickname} about={player.about}/>
                );
            })}
        </div>
    );

}
