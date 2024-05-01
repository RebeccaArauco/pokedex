
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import PokeInfo from './pages/PokeInfo';
import ProtectedRoutes from './pages/ProtectedRoutes';
import Pokedex from './pages/Pokedex';


function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<Pokedex/>}/>
          <Route path='/pokedex/:id' element={<PokeInfo/>}/>
        </Route>
      </Routes> 

    
    </div>
  )
}

export default App;
