import React, { useEffect, useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import './styles/pokeSelect.css'

const PokeSelect = ({setSelectValue}) => {

    const [types, getTypes] = useFetch();

    useEffect(() => {
      const url = 'https://pokeapi.co/api/v2/type/';
      getTypes(url)
    }, []);
    
    const selectOption = useRef();

    const handleChange = () => {
        setSelectValue(selectOption.current.value);
    }
  return (
    <div className='pokedex__input'>
      <select className='select__ref' ref={selectOption} onChange={handleChange}>
          <option className='select__option'>All pokemons</option>
          {
              types?.results.map(type => (
                  <option key = {type.url} value={type.url}>{type.name}</option>
              ))
          }
      </select>
    </div>
  )
}

export default PokeSelect;