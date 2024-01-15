import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './components/PokemonCard.jsx';

function App() {
    const [pokemonDataList, setPokemonDataList] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 20;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Haal naam op van pokemon op. Doe dit voor de eerste 20 pokemon vanaf de offset
    async function catchPokeNames() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const pokemonNames = response.data.results.map((pokemon) => pokemon.name );
            return pokemonNames;
        } catch (error) {
            throw error;
            console.log(error);
        }
    }

    // haal info specifieke volgende pokemon op en voeg toe aan de lijst
    async function catchPokeData(name) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemonDataList((prevDataList) => [...prevDataList, response.data]);
            console.log(response.data);
        } catch (error) {
            throw error;
            console.log(error);
        }
        }

        //  doe bovenstaande voor elke naam en alleen voor eerste 20 pokemon vanaf set Offset.
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const pokemonNames = await catchPokeNames();
                await Promise.all(pokemonNames.map((name) => catchPokeData(name)));
            } catch (error) {
                setError('Pokemon zijn ontsnapt!');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // return function cleanup() {
        //     controller.abort();
        // }

    //     Ik snap weinig van de cleanup functie. Krijg het niet werkend.

    }, [offset]);

    const handleNext = () => {
        setOffset(offset + limit);
        setPokemonDataList([]);
    };

    const handlePrevious = () => {
        if (offset >= limit) {
            setOffset(offset - limit);
            setPokemonDataList([]);
        }
    };


    return (
        <>
            <h1>Gotta catch em all!</h1>
            <button onClick={handlePrevious} disabled={offset === 0}>Vorige</button>
            <button onClick={handleNext} disabled={offset >= 800}>Volgende</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/*loop door de datalijst heen en toon voor iedere pokemon het component "PokemonCard":*/}
            {pokemonDataList.map((pokemonData, index) => (
                <PokemonCard key={index} pokemonData={pokemonData} />
            ))}
        </>
    );
}

export default App;
