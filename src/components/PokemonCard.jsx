import './PokomonCard.css' ;
import React from "react";

function PokemonCard ({ pokemonData} ){
    const { name, sprites, moves, weight, abilities } = pokemonData;

    return (
        <div className="card">
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <img src={sprites.front_default} alt={name} />
            <p>Moves: {moves.length}</p>
            <p>Weigth: {weight}</p>
            <p>Abilities:</p>
            <ul>
                {abilities.map((abilityData, i) => (
                    <li key={i}>{abilityData.ability.name}</li>
                ))}
            </ul>

        </div>
    )
}

export default PokemonCard;