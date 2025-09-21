import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {IoPlayCircleSharp} from "react-icons/io5"
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri"
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { removeFromLikedMovies } from '../store';
import { getTrailerUrl } from "../utils/api";


export default React.memo(function Card({movieData, isLiked=false}) {
  const [isHovered, setIsHovered] = useState(false);
  const [email,setEmail]= useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trailerUrl, setTrailerUrl] = useState(null);


  const handleClick = () => {
    navigate(`/player/${movieData.id}/${movieData.type || "movie"}`);
  };
  useEffect(() => {
    if (isHovered) {
      const fetchTrailer = async () => {
        const url = await getTrailerUrl(movieData.id, movieData.type || "movie");
        setTrailerUrl(url);
      };
      fetchTrailer();
    } else {
      setTrailerUrl(null);
    }
  }, [isHovered, movieData.id, movieData.type]);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });
    return () => unsubscribe();
  }, [navigate]);

  
  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {email,data: movieData,});
    }catch (error) {
      console.log(error);
    }
  };

return (
    <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt={movieData.name} />
      {isHovered && (
        <div className="hover">
          
          <div className="image-video-container">
            {trailerUrl ? (
              <iframe
                src={trailerUrl}
                title="Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div style={{ width: "100%", height: "140px", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
                <p style={{ color: "white", fontSize: "0.9rem" }}>Trailer non disponible</p>
              </div>
            )}
          </div>

          <div className="info-container flex column">
            <h3 className='name' onClick={handleClick}>{movieData.name}</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="Play" onClick={handleClick} />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck title="Remove From List" onClick={() => dispatch(removeFromLikedMovies({ movieId: movieData.id, email }))} />
                ) : (
                  <AiOutlinePlus title="Add to My List" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className='flex'>
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <p className="title">{movieData.name}</p>
      {isLiked && <span className="liked">❤️</span>}
    </Container>
  );
});

const Container = styled.div`
position: relative;
width: 200px;
cursor: pointer;
max-width: 230px;

img {
  border-radius: 0.2rem;
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s;
}

&:hover img {
  transform: scale(1.05);
}

.hover {
  z-index: 99;
  width: 20rem;
  position: absolute;
  top: -18vh;
  left: 0;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  background-color: #181818;
  transition: 0.3s ease-in-out;

  .image-video-container {
    position: relative;
    height: 140px;

    img, iframe {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 0.3rem;
      top: 0;
      z-index: 5;
      position: absolute;
    }
  }

  .info-container {
    padding: 1rem;
    gap: 0.5rem;
  }

  .icons .controls {
    display: flex;
    gap: 1rem;
  }

  .icons svg {
    font-size: 2rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      color: #b8b8b8;
    }
  }

  .genres ul {
    display: flex;
    gap: 1rem;
    li:first-of-type { list-style-type: none; }
  }
}

.title {
  color: white;
  text-align: center;
  margin-top: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}

.liked {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.2rem;
}
`;