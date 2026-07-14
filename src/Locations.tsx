import {useState, useEffect} from 'react';
import Post from './Post';

interface LocationsState {
    locations: Location[]
}

interface Location {
    title: string,
    subtitle: string,
    metatitle: string,
    awards: [],
    summary: string
    images: Image[]
}

interface Image {
    location: string
    title: string
    alt: string
}

export default function Locations() {

    const [state, setState] = useState(initialState);

    function initialState(): LocationsState {
        return {
            locations: [
                {
                    title: "",
                    subtitle: "",
                    metatitle: "",
                    awards: [],
                    summary: "",
                    images: [
                        {
                            location: "",
                            title: "",
                            alt: ""
                        }
                    ]
                }
            ]
        }
    }

    useEffect(() => {
        fetch('data/locations.json')
            .then(response => response.json())
            .then(json => setState({locations: json}));
    })

    return (
        <div className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="font-serif text-3xl font-bold text-fairway-900">Locations</h1>
            {state.locations.map((location, i) => {
                return (
                    <Post key={i} title={location.title} subtitle={location.subtitle} metatitle={location.metatitle}
                          images={location.images} summary={location.summary} awards={location.awards}/>
                );
            })}
        </div>
    );
}
