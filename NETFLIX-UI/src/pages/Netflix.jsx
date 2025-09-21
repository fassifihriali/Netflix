import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.png";
import Slider from "../components/Slider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

import heroVideo from "../assets/breaking_bad_trailer.mp4";

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded, dispatch, genres]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    window.onscroll = () => setIsScrolled(window.pageYOffset !== 0);
    return () => (window.onscroll = null);
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />

      <div className="hero">
        <img src={backgroundImage} alt="background" className="background-image" />

        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={() => setShowVideo(true)}>
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center" onClick={() => setShowInfo(true)}>
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>

      <Slider movies={movies} />

      {showVideo && (
        <div className="overlay">
          <video src={heroVideo} autoPlay controls onEnded={() => setShowVideo(false)} />
          <button className="close-btn" onClick={() => setShowVideo(false)}>X</button>
        </div>
      )}

      {showInfo && (
        <div className="overlay info-overlay">
          <div className="info-box">
            <h2>Breaking Bad</h2>
            <ul>
              <li><strong>Creator:</strong> Vince Gilligan</li>
              <li><strong>Country:</strong> USA</li>
              <li><strong>Language:</strong> English</li>
              <li><strong>genre:</strong> Crime, Drame, Thriller</li>
              <li><strong>First Air Date:</strong> January 20, 2008</li>
              <li><strong>Last Air Date:</strong> September 29, 2013</li>
              <li><strong>Number of Season:</strong> 5</li>
              <li><strong>Number of Episodes:</strong> 62</li>
              <li><strong>Average Episode Length:</strong> 47 minutes</li>
              <li><strong>Synopsis:</strong> WalterWhite, a chemistry diagnosed with cancer, starts producing methamphetamine to secure his family's financial future.</li>
              <li><strong>Main Characters:</strong> 
                <ul
                    style={{
                      marginLeft: "20px",
                      listStyleType: "circle"
                    }}
                >
                  <li>Walter White (Bryan Cranson)</li>
                  <li>Jesse Pinkman (Aaron Paul)</li>
                  <li>Skyler White (Anna Gunn)</li>
                  <li>Hank Schrader (Dean Norris)</li>
                </ul>
              </li>
              <li>
                <strong>Nobale Awards:</strong>16 Emmy Awards, including bEst Actor (Bryan Cranston) and Outstanding DramaSeries</li>
            </ul>
            <button className="close-btn" onClick={() => setShowInfo(false)}>X</button>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .hero {
    position: relative;
    .background-image {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      filter: brightness(60%);
    }

    .container {
      position: absolute;
      bottom: 5rem;
      left: 5rem;
      z-index: 10;

      .logo img {
        width: 500px;
      }

      .buttons {
        margin-top: 2rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem 2rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover { opacity: 0.8; }
          &:nth-of-type(2) { background-color: rgba(109,109,110,0.7); color: white; }
        }
      }
    }
  }

  /* Overlay vidéo et info */
  .overlay {
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content:center;
    align-items:center;
    z-index: 9999;
    video {
      width: 60%;
      height: auto;
      border-radius: 0.3rem;
    }
    .close-btn {
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: red;
      color: white;
      border: none;
      border-radius: 0.3rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }

  .info-overlay .info-box {
  background: #181818;
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 800px;
  max-height: 70vh;
  overflow-y: auto; /* scroll si le contenu dépasse */
  text-align: left;
  position: relative;
}

.info-overlay .close-btn {
  top: 1rem;
  right: 1rem;
  position: absolute;
}
`;
