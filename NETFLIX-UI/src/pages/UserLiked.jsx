import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersLikedMovies } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Card from '../components/Card';
import background from "../assets/background.jpg";
import Footer from '../components/Footer'


export default function UserLiked(){
    const [isScrolled, setScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();
    const movies = useSelector((state)=>state.netflix.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setEmail(currentUser.email);
            else navigate("/login");
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(()=> {
        if(email){
            dispatch(getUsersLikedMovies(email));
        }
    },[email, dispatch]);
    useEffect(() => {
        window.onscroll = () => {
            setScrolled(window.pageYOffset !== 0);
            return () => (window.onscroll = null);
        };
    }, []);

    return(
        <Container>
            <div className='background'></div>
            <Navbar isScrolled={isScrolled}/>
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {(movies || []).map((movie, index) => (
                        <Card movieData={movie} index={index} key={movie.id} isLiked={true}/>
                    ))}
                </div>

            </div>
            <Footer/>
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
  .content{
      margin: 2.3rem;
      margin-top: 8rem;
      gap: 3rem;
      position : relative;
      z-index : 1;
      h1{
          margin-left: 3rem;
      }
      .grid{
          flex-wrap: wrap;
          gap: 1rem;
          display : flex;
          justify-content : center;
      }
    }
`;
