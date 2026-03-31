import { useState } from "react";

function Jokes() {

    const [jokes, setJoke] = useState('No joke yet');

    const getJoke = () => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(response => response.json())
            .then(data => setJoke(data['value']))

    }

    return (
        <div>
            <h1>Chuck Norris Jokes</h1>

            <button onClick={getJoke}>Get Joke</button>
            <div style={{ paddingTop: '20px' }}>
                {jokes}
            </div>
        </div>
    )
}

export default Jokes;