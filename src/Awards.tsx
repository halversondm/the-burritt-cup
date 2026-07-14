import {useState, useEffect} from 'react';
import Award from './Award.js';

export default function Awards() {

    const [state, setState] = useState({
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
    });

    useEffect(() => {
        fetch('data/awards.json')
            .then(response => response.json())
            .then(json => setState({awards: json}));
    })


    return (
        <div className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="font-serif text-3xl font-bold text-fairway-900">Awards</h1>
            {state.awards.map((award, i) => {
                return (
                    <Award key={i} image={award.image} alt={award.alt} title={award.title} subtitle={award.subtitle}
                           metatitle={award.metatitle} winners={award.winners}/>
                );
            })}
        </div>
    );
}
