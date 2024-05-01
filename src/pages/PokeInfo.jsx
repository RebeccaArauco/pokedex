import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './styles/pokeInfo.css'

const PokeInfo = () => {

const params = useParams();

const [pokemon, getPokemon] = useFetch();

useEffect(() => {
 const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
 getPokemon (url);
}, [])

const calculateBarWidth = (statValue) => {
    const maxStatValue = 150;
    return (statValue / maxStatValue) * 100 + '%';
};

//console.log(pokemon);

  return (
    <div>
      <div className="banner">
      <img className="banner__image" src="https://rajgaurav99.github.io/PokeCards-WEB/images/banner.png" alt="banner image" /> 
      <div className="banner__content">
                <div className="circle__out"></div>
                <div className="circle__in"></div>
        </div>  
    </div>
    <div className='info__container'>
    <div className={`info__back ${pokemon?.types[0].type.name}`}></div>     
    <section>
    
    <figure className='imagen__info'>
            <img className='info__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
        </figure>
        <div className='first__inf'>
        <span># {pokemon?.id}</span>
        
        <h2>{pokemon?.name}</h2>
        <ul className='info__wh'>
           <li><span>Weight</span> <br /> <span className='wh__results'> {pokemon?.weight}</span></li> 
           <li><span>Height</span> <br /> <span className='wh__results'> {pokemon?.height}</span></li>
        </ul>
        <div className='info__ts'>
            <article className='type__results'>
                <h3>Type</h3>
                <ul>
                    {
                        pokemon?.types.map (type => (
                            <li key={type.type.url}>{type.type.name}</li>
                        ))
                    }
                </ul>
            </article>
            <article className='skills__results'>
                <h3>Skills</h3>
                <ul>
                    {
                        pokemon?.abilities.map(skill => (
                            <li key={skill.ability.url}>{skill.ability.name}</li>
                        ))
                    }
                </ul>
            </article>
        </div>
     </div>
        <h2 className='stats__title'>Stats</h2>
        <ul className='info__stats'>
            {
                pokemon?.stats.map (stat => (
                    <li key = {stat.stat.url}><span>{stat.stat.name}:</span> <span>{stat.base_stat}/150</span>
                    <div className="stat__bar" style={{ width: calculateBarWidth(stat.base_stat) }}></div></li>
                ))
            }
        </ul>
        <h2 className='move__title'>Movements</h2>
        <ul className='info__movements'>
            {
                pokemon?.moves.map(move => (
                    <li key = {move.move.url}>{move.move.name}</li>
                ))
            }
        </ul>
    </section>
    </div>
    </div>
  )
};

export default PokeInfo;