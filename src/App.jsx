import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './components/PokemonCard.jsx';

function App() {
    const [pokemonDataList, setPokemonDataList] = useState([]);

    async function catchPokeNames() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const pokemonNames = response.data.results.map((pokemon) => pokemon.name );
            return pokemonNames;
        } catch (error) {
            console.log(error);
        }
    }

    async function catchPokeData(name) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setPokemonDataList((prevDataList) => [...prevDataList, response.data]);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        }


    useEffect(() => {
        async function fetchData() {
            const pokemonNames = await catchPokeNames();
            pokemonNames.forEach((name) => {
                catchPokeData(name);
            });
        }
        fetchData();
    }, []);

    return (
        <>
            <h1>Gotta catch em all!</h1>
            {pokemonDataList.map((pokemonData, index) => (
                <PokemonCard key={index} pokemonData={pokemonData} />
            ))}
        </>
    );
}

export default App;
