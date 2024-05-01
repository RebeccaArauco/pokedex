import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/pokedex.css'
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedex/PokeCard';
import PokeSelect from '../components/pokedex/PokeSelect';
import Pagination from '../components/pokedex/Pagination';

const Pokedex = () => {

    const [selectValue, setSelectValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [pokemons, getPokemons, getType] = useFetch();
    const trainer = useSelector (store => store.trainer);
   
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 6;

    useEffect(() => {
        if(selectValue) {
            getType(selectValue);
        } else {
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
            getPokemons(url);   
        }
    }, [selectValue]);

    const textInput = useRef ();

    const handleSubmit = () => {
        event.preventDefault();
        setInputValue(textInput.current.value.toLowerCase().trim());
        textInput.current.value= '';
    }
        //console.log(pokemons);

    const pokeSearch = (poke) => {
        const perName = poke.name.includes(inputValue);
        return perName;
    }
    
   
    const indexOfLastPokemon = currentPage * itemsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
    const currentPokemons = pokemons?.results.filter(pokeSearch).slice(indexOfFirstPokemon, indexOfLastPokemon);



    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

  return (
    <div>
      <div className="banner">
      <img className="banner__image" src="https://rajgaurav99.github.io/PokeCards-WEB/images/banner.png" alt="banner image" /> 
      <div className="banner__content">
                <div className="circle__out"></div>
                <div className="circle__in"></div>
        </div>  
    </div>


    <section className='pokedex'>
        <h2 className='pokedex__title'><span>Welcome {trainer},</span> here you can find your favorite pokemon</h2>
        <div className='pokedex__input'> 
            <form onSubmit={handleSubmit}>
                <input className='pokedex__ipt' ref={textInput} type="text" />
                <button className='pokedex__button'>Search</button>
            </form>
            <PokeSelect
                setSelectValue={setSelectValue}
            />
        </div>
        <div  className='pokedex__container'>
            
               {currentPokemons? ( 
               currentPokemons.map ((poke) => (
                    <PokeCard
                    key = {poke.url}
                    url={poke.url}
                    />
                ))
            ) : (
                <p>Loading...</p>
            )
            
        }
        </div>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(pokemons?.results.filter(pokeSearch).length / itemsPerPage)} paginate={paginate} />
    </section>
        
</div>
  )
}

export default Pokedex;