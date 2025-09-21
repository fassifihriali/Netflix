import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'
import Player from './pages/Player'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import UserLiked from './pages/UserLiked'
import Search from "./pages/Search";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Netflix/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/tv' element={<TVShows/>}/>
        <Route path='/mylist' element={<UserLiked/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/player' element={<Player/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App