import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import background from "../assets/background.jpg";

export default function TVShows() {
    const [isScrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state)=>state.netflix.genresLoaded);
    const movies = useSelector((state)=>state.netflix.movies);
    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(getGenres());
    },[dispatch]);
    
    useEffect(()=>{
        if(genresLoaded){
            dispatch(fetchMovies({type:"tv"}));
        }
    }, [genresLoaded, dispatch]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth,(currentUser)=>{
            if(currentUser) setUser(currentUser.uid);
            else navigate("/login");
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        window.onscroll = () => {
            setScrolled(window.pageYOffset !== 0);
            return () => (window.onscroll = null);
        };
    }, []);

    return (
    <Container>
        <div className="background"></div>
            <Navbar isScrolled={isScrolled} />
        
        <div className="data">
            <SelectGenre genres={genres} type="tv"/>
            {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
        </div>
    </Container>
  )
}

const Container = styled.div`
position : relative;
  min-height: 100vh;
  width: 100%;
  overflow : hidden;
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${background}) no-repeat center center/cover;
    z-index: -1;
  }
  .data {
      margin-top: 8rem;
      position : relative;
      .not-available {
          text-align: center;
          color: white;
          margin-top: 4rem;
      }
  }
`;
