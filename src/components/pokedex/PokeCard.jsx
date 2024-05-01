import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './styles/pokeCard.css';
import { useNavigate } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';


const PokeCard = ({url}) => {

    const [pokemon, getPokemon] = useFetch();
    const navigate = useNavigate();
    
    useEffect(() => {
     getPokemon (url);
    }, []);
    
    const handlePokemon = () => {
        navigate(`/pokedex/${pokemon.id}`);
    };
   
  return (
    <div className='poke__container'>
    <article onClick={handlePokemon} className='pokecard'>
        <div className={`pokecard__back ${pokemon?.types[0].type.name}`}></div>
        <figure className='pokecard__img'>
            <img src={pokemon?.sprites.other['official-artwork'].front_default} alt = "pokemonimage" />
        </figure>
        <h3 className={`pokecard__name ${pokemon?.types[0]?.type?.name ? pokemon.types[0].type.name.toLowerCase() : ''}`}>{pokemon?.name}</h3>
        <ul className='pokecard__types'>
            {
                pokemon?.types.map ((type, index) => (
                    <li className={`slotes${type.slot}`} key ={type.type.url}>
                    {index !== 0 && ' /'}
                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</li>
                ))
            }
        </ul>
        <span>Type</span>
        <hr />
        <ul className='pokecard__stats'>
            {
                pokemon?.stats.map(stat => (
                    !stat.stat.name.includes ('-') &&
                    <li key={stat.stat.url}><span>{stat.stat.name.toUpperCase()}</span><span>{stat.base_stat}</span></li>
                ))
            }
        </ul>
    </article>
    </div>
  )
}

export default PokeCard;