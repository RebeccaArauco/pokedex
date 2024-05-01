import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setTrainer } from '../store/slices/trainer.slice';
import { useNavigate } from 'react-router-dom';
import './styles/homePage.css'

const HomePage = () => {

const dispatch = useDispatch();

const navigate = useNavigate ();

const textInput = useRef();

const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainer(textInput.current.value.trim()));
    textInput.current.value = '';
    navigate('/pokedex');
}

  return (
    <div className='home__container'>
        <img className="pokedex__image" src="https://rajgaurav99.github.io/PokeCards-WEB/images/banner.png" alt="pokedex"  />
        <h1 className='home__title'>Hi Trainer!</h1>
        <h2 className='home__message'>To start give me your name</h2>
        <form className='home__form' onSubmit={handleSubmit}>
            <input className='home__input' ref={textInput} type="text" />
            <button className='home__button'>Start</button>
        </form>
          <div className="banner">
            <div className="circle__container">
              <div className="outer__circle">
                <div className="inner__circle"></div>
            </div>
        </div>
    </div>
</div>
  )
  
}

export default HomePage;